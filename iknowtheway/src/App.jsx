import React, { useState, useEffect } from "react";
import "./App.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error(error)
    );
  }, []);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const calculateRoute = () => {
    if (userLocation && destination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: destination,
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "500px" }}
        >
          {userLocation && <Marker position={userLocation} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      <input
        type="text"
        value={destination}
        onChange={handleDestinationChange}
        placeholder="Gitmek istediğiniz yeri girin"
      />
      <button onClick={calculateRoute}>Yolu Göster</button>
    </div>
  );
};

export default App;
