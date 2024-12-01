// LocationDetect.js (Location Detection Component)
import React, { useState, useEffect } from 'react';

const LocationDetect = ({ onLocationChange }) => {
  const [locationError, setLocationError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange(latitude, longitude); // Pass coordinates to parent component
        },
        (error) => {
          setLocationError('Unable to retrieve your location');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <h2>Location Detection</h2>
      {locationError ? <p>{locationError}</p> : <p>Fetching your location...</p>}
    </div>
  );
};

export default LocationDetect;
