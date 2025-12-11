import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import StatusBadge from '../UI/StatusBadge';
import routingService from '../../utils/routingService';

// Calculate distance between two coordinates in kilometers
const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Update route directions in the admin panel
const updateRouteDirections = (route) => {
  // Update distance and duration
  const distanceElement = document.getElementById('route-distance');
  const durationElement = document.getElementById('route-duration');
  const stepsElement = document.getElementById('route-steps');

  if (distanceElement) {
    distanceElement.textContent = routingService.formatDistance(route.distance);
  }
  
  if (durationElement) {
    durationElement.textContent = routingService.formatDuration(route.duration);
  }

  // Update turn-by-turn directions
  if (stepsElement && route.steps && route.steps.length > 0) {
    const stepsHTML = route.steps.map((step, index) => {
      const instruction = step.maneuver?.instruction || step.instruction || 'Continue straight';
      const distance = step.distance ? routingService.formatDistance(step.distance) : '';
      
      return `
        <div class="flex items-start text-sm text-gray-700 dark:text-gray-300">
          <div class="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span class="text-xs font-medium text-blue-600 dark:text-blue-400">${index + 1}</span>
          </div>
          <div class="flex-1">
            <p class="font-medium">${instruction}</p>
            ${distance ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${distance}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    stepsElement.innerHTML = stepsHTML;
  } else if (stepsElement) {
    // Show basic directions if no detailed steps available
    stepsElement.innerHTML = `
      <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <div class="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
          <span class="text-xs font-medium text-green-600 dark:text-green-400">🚩</span>
        </div>
        <span>Start from your current location</span>
      </div>
      <div class="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
        <div class="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
          <span class="text-xs font-medium text-blue-600 dark:text-blue-400">🗺️</span>
        </div>
        <span>Follow the blue route line on the map</span>
      </div>
      <div class="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
        <div class="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
          <span class="text-xs font-medium text-red-600 dark:text-red-400">🎯</span>
        </div>
        <span>Arrive at the issue location</span>
      </div>
    `;
  }
};

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({
  height = '400px',
  center = [40.7589, -73.9851], // Default to NYC
  zoom = 13,
  issues = [],
  selectedIssue = null,
  currentLocation = null,
  adminLocation = null,
  onIssueSelect = () => {},
  onLocationChange = () => {},
  onMapClick = () => {},
  clickable = false,
  draggableMarker = false,
  showRouting = false,
  className = ''
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const adminLocationMarkerRef = useRef(null);
  const clickMarkerRef = useRef(null);
  const routingLayerRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // Custom icon for different issue statuses
  const createCustomIcon = (status, priority) => {
    let color = '#3B82F6'; // Default blue
    
    if (status === 'resolved') color = '#10B981'; // Green
    else if (status === 'in_progress') color = '#F59E0B'; // Orange
    else if (status === 'rejected') color = '#EF4444'; // Red
    else if (priority === 'urgent') color = '#DC2626'; // Dark red
    else if (priority === 'high') color = '#EA580C'; // Orange red

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          border: 3px solid white;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            color: white;
            font-size: 12px;
            font-weight: bold;
            transform: rotate(45deg);
          ">!</div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Create markers layer
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Create routing layer
    const routingLayer = L.layerGroup().addTo(map);
    routingLayerRef.current = routingLayer;

    // Click handling is now done in a separate useEffect

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update click handlers when they change
  useEffect(() => {
    if (!mapReady || !clickable) return;

    const map = mapInstanceRef.current;
    
    // Remove existing click handlers
    map.off('click');
    
    // Add updated click handler
    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      console.log('Map clicked at:', lat, lng); // Debug log
      
      // Remove existing click marker
      if (clickMarkerRef.current) {
        map.removeLayer(clickMarkerRef.current);
      }

      // Add new click marker
      const marker = L.marker([lat, lng], {
        draggable: draggableMarker,
        icon: L.divIcon({
          className: 'custom-click-marker',
          html: `
            <div style="
              background-color: #3B82F6;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(map);

      if (draggableMarker) {
        marker.on('dragend', (e) => {
          const newPos = e.target.getLatLng();
          onLocationChange({ lat: newPos.lat, lng: newPos.lng });
        });
      }

      clickMarkerRef.current = marker;
      onMapClick({ lat, lng });
      onLocationChange({ lat, lng });
    };

    map.on('click', handleMapClick);

    return () => {
      if (map) {
        map.off('click', handleMapClick);
      }
    };
  }, [mapReady, clickable, draggableMarker, onMapClick, onLocationChange]);

  // Update issues markers
  useEffect(() => {
    if (!mapReady || !markersLayerRef.current) return;

    // Clear existing markers
    markersLayerRef.current.clearLayers();

    // Add issue markers
    issues.forEach((issue) => {
      if (!issue.location || !issue.location.coordinates) return;

      const [lng, lat] = issue.location.coordinates;
      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(issue.status, issue.priority)
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <div style="margin-bottom: 8px;">
            <strong>${issue.title}</strong>
          </div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666;">
            ${issue.description?.substring(0, 100)}${issue.description?.length > 100 ? '...' : ''}
          </div>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <span style="
              background: ${issue.status === 'resolved' ? '#10B981' : issue.status === 'in_progress' ? '#F59E0B' : '#6B7280'};
              color: white;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
            ">${issue.status.replace('_', ' ')}</span>
            ${issue.priority === 'urgent' ? `
              <span style="
                background: #DC2626;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
              ">Urgent</span>
            ` : ''}
          </div>
          <div style="font-size: 12px; color: #888;">
            ${issue.address?.formatted || 'Address not available'}
          </div>
          <div style="font-size: 12px; color: #888; margin-top: 4px;">
            Reported: ${new Date(issue.createdAt).toLocaleDateString()}
          </div>
          <button 
            onclick="window.handleIssueClick('${issue._id}')"
            style="
              background: #3B82F6;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 12px;
              cursor: pointer;
              margin-top: 8px;
            "
          >
            View Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        onIssueSelect(issue);
      });

      markersLayerRef.current.addLayer(marker);
    });

    // Fit bounds to show all markers if there are issues
    if (issues.length > 0) {
      const group = new L.featureGroup(markersLayerRef.current.getLayers());
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [issues, mapReady, onIssueSelect]);

  // Update current location marker
  useEffect(() => {
    if (!mapReady || !currentLocation) return;

    // Remove existing current location marker
    if (currentLocationMarkerRef.current) {
      mapInstanceRef.current.removeLayer(currentLocationMarkerRef.current);
    }

    // Add current location marker
    const marker = L.marker([currentLocation.lat, currentLocation.lng], {
      icon: L.divIcon({
        className: 'current-location-marker',
        html: `
          <div style="
            background-color: #3B82F6;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
            animation: pulse 2s infinite;
          "></div>
          <style>
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
              100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            }
          </style>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      })
    }).addTo(mapInstanceRef.current);

    currentLocationMarkerRef.current = marker;
  }, [currentLocation, mapReady]);

  // Update admin location marker
  useEffect(() => {
    if (!mapReady || !adminLocation) return;

    // Remove existing admin location marker
    if (adminLocationMarkerRef.current) {
      mapInstanceRef.current.removeLayer(adminLocationMarkerRef.current);
    }

    // Add admin location marker
    const marker = L.marker([adminLocation.lat, adminLocation.lng], {
      icon: L.divIcon({
        className: 'admin-location-marker',
        html: `
          <div style="
            background-color: #10B981;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              color: white;
              font-size: 10px;
              font-weight: bold;
            ">A</div>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      })
    }).addTo(mapInstanceRef.current);

    marker.bindPopup('Admin Location');
    adminLocationMarkerRef.current = marker;
  }, [adminLocation, mapReady]);

  // Highlight selected issue and show routing
  useEffect(() => {
    if (!mapReady) return;

    // Clear routing if no issue selected
    if (!selectedIssue && routingLayerRef.current) {
      routingLayerRef.current.clearLayers();
      return;
    }

    if (!selectedIssue || !selectedIssue.location) return;

    const [lng, lat] = selectedIssue.location.coordinates;
    mapInstanceRef.current.setView([lat, lng], 16);

    // Show routing line if admin location is available and routing is enabled
    if (showRouting && adminLocation && routingLayerRef.current) {
      // Clear existing routing
      routingLayerRef.current.clearLayers();

      // SIMPLE ROUTE DISPLAY - ALWAYS WORKS
      const getAndDisplayRoute = async () => {
        console.log('🗺️ CREATING BLUE ROUTE LINE');
        console.log('📍 From Admin:', adminLocation);
        console.log('📍 To Issue:', { lat, lng });

        // ALWAYS CREATE BLUE LINE FIRST
        const routeCoordinates = [
          [adminLocation.lat, adminLocation.lng], // Start
          [lat, lng] // End
        ];

        console.log('🎨 Route coordinates:', routeCoordinates);

        // Create thick blue line
        const routeLine = L.polyline(routeCoordinates, {
          color: '#3B82F6',
          weight: 12,
          opacity: 1.0,
          className: 'route-line'
        });

        // Add to map immediately
        routingLayerRef.current.addLayer(routeLine);
        console.log('✅ BLUE LINE ADDED TO MAP');

        // Add start marker
        const startMarker = L.marker([adminLocation.lat, adminLocation.lng], {
          icon: L.divIcon({
            className: 'start-marker',
            html: `<div style="background: #10B981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).bindPopup('🚩 Admin Location');
        routingLayerRef.current.addLayer(startMarker);
        console.log('✅ START MARKER ADDED');

        // Add end marker
        const endMarker = L.marker([lat, lng], {
          icon: L.divIcon({
            className: 'end-marker',
            html: `<div style="background: #EF4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).bindPopup('🎯 Issue Location');
        routingLayerRef.current.addLayer(endMarker);
        console.log('✅ END MARKER ADDED');

        // Zoom to show route
        const group = new L.featureGroup([startMarker, endMarker]);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
        console.log('✅ MAP ZOOMED TO SHOW ROUTE');
      };

      // Call the route display function
      getAndDisplayRoute();
    }
  };

  // Rest of the component continues...
            icon: L.divIcon({
              className: 'admin-route-marker',
              html: `
                <div style="
                  background: linear-gradient(135deg, #10B981, #059669);
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 14px;
                ">🚩</div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            })
          });

          startMarker.bindPopup(`
            <div style="text-align: center;">
              <strong>🏢 Admin Location</strong><br>
              <small>Starting Point</small>
            </div>
          `);

          // Add end marker (Issue location)
          const endMarker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'issue-route-marker',
              html: `
                <div style="
                  background: linear-gradient(135deg, #EF4444, #DC2626);
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 14px;
                ">🎯</div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            })
          });

          endMarker.bindPopup(`
            <div style="text-align: center;">
              <strong>📍 Issue Location</strong><br>
              <small>${selectedIssue.title}</small><br>
              <small style="color: #666;">${selectedIssue.address?.formatted || 'Address not available'}</small>
            </div>
          `);

          // Add markers to routing layer
          routingLayerRef.current.addLayer(startMarker);
          routingLayerRef.current.addLayer(endMarker);

          // Add route information at the midpoint
          const midIndex = Math.floor(route.coordinates.length / 2);
          const midpoint = route.coordinates[midIndex];
          
          const routeInfoMarker = L.marker(midpoint, {
            icon: L.divIcon({
              className: 'route-info-marker',
              html: `
                <div style="
                  background: rgba(59, 130, 246, 0.95);
                  color: white;
                  padding: 8px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: 600;
                  white-space: nowrap;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                  border: 2px solid white;
                  text-align: center;
                ">
                  🚗 ${routingService.formatDistance(route.distance)}<br>
                  ⏱️ ${routingService.formatDuration(route.duration)}
                </div>
              `,
              iconSize: [100, 40],
              iconAnchor: [50, 20]
            })
          });

          routingLayerRef.current.addLayer(routeInfoMarker);

          // Add turn-by-turn markers if available
          if (route.steps && route.steps.length > 0) {
            route.steps.forEach((step, index) => {
              if (step.maneuver && step.maneuver.location) {
                const [lng, lat] = step.maneuver.location;
                const stepMarker = L.circleMarker([lat, lng], {
                  radius: 4,
                  fillColor: '#3B82F6',
                  color: 'white',
                  weight: 2,
                  opacity: 1,
                  fillOpacity: 0.8
                });

                stepMarker.bindPopup(`
                  <div style="font-size: 12px;">
                    <strong>Step ${index + 1}</strong><br>
                    ${step.maneuver.instruction || 'Continue'}
                  </div>
                `);

                routingLayerRef.current.addLayer(stepMarker);
              }
            });
          }

          // Fit bounds to show the complete route
          mapInstanceRef.current.fitBounds(routeLine.getBounds().pad(0.1));

          // Store route data for external use and update UI
          window.currentRoute = route;
          
          // Update route information in the directions panel
          updateRouteDirections(route);

        } catch (error) {
          console.error('❌ Error getting route:', error);
          
          // Clear loading indicator
          routingLayerRef.current.clearLayers();
          
          // Always show a blue line, even if routing fails
          console.log('🔄 Creating emergency fallback route');
          const fallbackCoords = [
            [adminLocation.lat, adminLocation.lng],
            [lat, lng]
          ];
          
          const fallbackLine = L.polyline(fallbackCoords, {
            color: '#3B82F6',
            weight: 8,
            opacity: 0.9,
            dashArray: '10, 5',
            className: 'fallback-route-line'
          });
          
          routingLayerRef.current.addLayer(fallbackLine);
          console.log('✅ Fallback blue line added');
          
          // Add basic markers
          const startMarker = L.marker([adminLocation.lat, adminLocation.lng], {
            icon: L.divIcon({
              className: 'admin-route-marker',
              html: `<div style="background: #10B981; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          });
          
          const endMarker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'issue-route-marker',
              html: `<div style="background: #EF4444; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          });
          
          routingLayerRef.current.addLayer(startMarker);
          routingLayerRef.current.addLayer(endMarker);
          
          // Fit bounds to show both locations
          const group = new L.featureGroup([startMarker, endMarker]);
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
          
          // Show error message
          const errorMarker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'route-error-marker',
              html: `
                <div style="
                  background: rgba(239, 68, 68, 0.95);
                  color: white;
                  padding: 8px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: 600;
                  white-space: nowrap;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                  border: 2px solid white;
                  margin-top: 30px;
                ">
                  ⚠️ Using direct route
                </div>
              `,
              iconSize: [120, 30],
              iconAnchor: [60, -30]
            })
          });
          routingLayerRef.current.addLayer(errorMarker);
        }
      };

      // Execute route calculation
      getAndDisplayRoute();
    }
  }, [selectedIssue, mapReady, showRouting, adminLocation]);

  // Global function for popup button clicks
  useEffect(() => {
    window.handleIssueClick = (issueId) => {
      const issue = issues.find(i => i._id === issueId);
      if (issue) {
        onIssueSelect(issue);
      }
    };

    return () => {
      delete window.handleIssueClick;
    };
  }, [issues, onIssueSelect]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        style={{ height, width: '100%' }}
        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      />
      
      {/* Map overlay info */}
      {issues.length > 0 && (
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-[1000]">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-900 dark:text-white">
              {issues.length} issue{issues.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Click instruction for clickable maps */}
      {clickable && (
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white rounded-lg shadow-lg p-3 z-[1000]">
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="w-4 h-4" />
            <span>Click on map to select location</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;