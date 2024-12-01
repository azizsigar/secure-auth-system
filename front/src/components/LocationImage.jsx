// LocationImage.js (Image Display Component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationImage = ({ latitude, longitude }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (latitude && longitude) {
      fetchImage(latitude, longitude); // Fetch image whenever coordinates change
    }
  }, [latitude, longitude]);

  const fetchImage = async (latitude, longitude) => {
    try {
      const apiKey = '4EpVp6e2HLtKfdyFAsqPYQ00aEPZcheoF0qQz1Q9oLg'; // Replace with your Unsplash API key
      const locationQuery = `${latitude},${longitude}`;
      const response = await axios.get(`https://api.unsplash.com/photos/random?query=${locationQuery}&client_id=${apiKey}`);

      if (response.data.length > 0) {
        setImageUrl(response.data[0].urls.regular); // Set the image URL from Unsplash
      } else {
        setError('No image found for this location');
      }
    } catch (err) {
      setError('Failed to fetch image from Unsplash');
    }
  };

  return (
    <div>
      <h2>Location Image</h2>
      {error && <p>{error}</p>}
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="Location Background" />
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default LocationImage;
