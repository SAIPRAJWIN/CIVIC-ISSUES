// Routing service for getting actual road routes
class RoutingService {
  constructor() {
    // Using OpenRouteService as it's free and reliable
    this.baseUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
    // You can get a free API key from https://openrouteservice.org/
    this.apiKey = '5b3ce3597851110001cf6248a1b2c8c8b8e04c5b8b5f4e4c4d4e4f4g'; // Demo key - replace with your own
  }

  async getRoute(startCoords, endCoords) {
    try {
      const url = `${this.baseUrl}?api_key=${this.apiKey}&start=${startCoords.lng},${startCoords.lat}&end=${endCoords.lng},${endCoords.lat}&format=geojson`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Routing service error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const route = data.features[0];
        const coordinates = route.geometry.coordinates;
        const properties = route.properties;
        
        // Convert coordinates from [lng, lat] to [lat, lng] for Leaflet
        const leafletCoords = coordinates.map(coord => [coord[1], coord[0]]);
        
        return {
          coordinates: leafletCoords,
          distance: properties.segments[0].distance, // in meters
          duration: properties.segments[0].duration, // in seconds
          steps: properties.segments[0].steps || [],
          summary: properties.summary
        };
      }
      
      throw new Error('No route found');
    } catch (error) {
      console.error('Routing error:', error);
      // Fallback to straight line if routing service fails
      return this.getFallbackRoute(startCoords, endCoords);
    }
  }

  getFallbackRoute(startCoords, endCoords) {
    // Simple straight line as fallback
    const coordinates = [
      [startCoords.lat, startCoords.lng],
      [endCoords.lat, endCoords.lng]
    ];
    
    const distance = this.calculateDistance(startCoords, endCoords) * 1000; // Convert to meters
    
    return {
      coordinates,
      distance,
      duration: Math.round(distance / 50 * 3.6), // Rough estimate: 50 km/h average
      steps: [],
      summary: {
        distance,
        duration: Math.round(distance / 50 * 3.6)
      },
      isFallback: true
    };
  }

  calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  formatDistance(meters) {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    } else {
      return `${(meters / 1000).toFixed(1)} km`;
    }
  }

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  // Alternative routing service using OSRM (Open Source Routing Machine)
  async getRouteOSRM(startCoords, endCoords) {
    console.log('🗺️ Getting route from:', startCoords, 'to:', endCoords);
    
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson&steps=true`;
      
      console.log('🌐 OSRM URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ OSRM API error:', response.status, response.statusText);
        throw new Error(`OSRM API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 OSRM Response:', data);
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates;
        
        console.log('🛣️ Route coordinates count:', coordinates.length);
        
        // Convert coordinates from [lng, lat] to [lat, lng] for Leaflet
        const leafletCoords = coordinates.map(coord => [coord[1], coord[0]]);
        
        console.log('✅ Route processed successfully:', {
          distance: route.distance,
          duration: route.duration,
          coordinatesCount: leafletCoords.length
        });
        
        return {
          coordinates: leafletCoords,
          distance: route.distance, // in meters
          duration: route.duration, // in seconds
          steps: route.legs[0].steps || [],
          summary: {
            distance: route.distance,
            duration: route.duration
          }
        };
      }
      
      throw new Error('No route found in OSRM response');
    } catch (error) {
      console.error('❌ OSRM routing error:', error);
      console.log('🔄 Falling back to simple route');
      return this.getFallbackRoute(startCoords, endCoords);
    }
  }

  // Simplified routing that always works
  async getSimpleRoute(startCoords, endCoords) {
    console.log('🗺️ Getting simple route from:', startCoords, 'to:', endCoords);
    
    // First try OSRM
    try {
      const result = await this.getRouteOSRM(startCoords, endCoords);
      if (result && result.coordinates && result.coordinates.length > 2) {
        console.log('✅ OSRM route successful');
        return result;
      }
    } catch (error) {
      console.log('⚠️ OSRM failed, using fallback');
    }
    
    // Fallback to straight line with intermediate points for better visualization
    return this.getEnhancedFallbackRoute(startCoords, endCoords);
  }

  getEnhancedFallbackRoute(startCoords, endCoords) {
    console.log('🔄 Creating enhanced fallback route');
    
    // Create a route with multiple intermediate points for smoother line
    const coordinates = [];
    const steps = 10; // Number of intermediate points
    
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      const lat = startCoords.lat + (endCoords.lat - startCoords.lat) * ratio;
      const lng = startCoords.lng + (endCoords.lng - startCoords.lng) * ratio;
      coordinates.push([lat, lng]);
    }
    
    const distance = this.calculateDistance(startCoords, endCoords) * 1000; // Convert to meters
    const duration = Math.round(distance / 50 * 3.6); // Rough estimate: 50 km/h average
    
    console.log('✅ Fallback route created:', {
      distance,
      duration,
      coordinatesCount: coordinates.length
    });
    
    return {
      coordinates,
      distance,
      duration,
      steps: [],
      summary: {
        distance,
        duration
      },
      isFallback: true
    };
  }
}

export default new RoutingService();