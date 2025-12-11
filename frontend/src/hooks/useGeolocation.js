import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = new Error('Geolocation is not supported by this browser');
        setError(error);
        reject(error);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          setLocation(newLocation);
          setLoading(false);
          resolve(newLocation);
        },
        (error) => {
          let errorMessage = 'Failed to get your location. ';
          
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage += 'Please allow location access in your browser settings.';
              break;
            case 2: // POSITION_UNAVAILABLE
              errorMessage += 'Location information is unavailable.';
              break;
            case 3: // TIMEOUT
              errorMessage += 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage += 'Please try selecting location manually on the map.';
          }
          
          setError(errorMessage);
          setLoading(false);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  // Auto-get location on mount (optional)
  useEffect(() => {
    // Uncomment if you want to auto-get location on component mount
    // getCurrentLocation().catch(() => {
    //   // Silently fail on auto-get
    // });
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation
  };
};

export default useGeolocation;