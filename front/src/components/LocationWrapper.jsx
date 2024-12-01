// LocationWrapper.js (Parent Component)
import React, { useState } from 'react';
import LocationDetect from './LocationDetect';
import LocationImage from './LocationImage';

const LocationWrapper = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });

  const handleLocationChange = (latitude, longitude) => {
    setCoordinates({ latitude, longitude }); // Update coordinates in the parent state
  };

  return (
    <div>
      <h1>Location and Image Display</h1>

      {/* Location Detection Component */}
      <LocationDetect onLocationChange={handleLocationChange} />

      {/* Location Image Component, only render it if coordinates are available */}
      {coordinates.latitude && coordinates.longitude ? (
        <LocationImage latitude={coordinates.latitude} longitude={coordinates.longitude} />
      ) : (
        <p>Please allow location access to display an image of your city.</p>
      )}
    </div>
  );
};

export default LocationWrapper;
