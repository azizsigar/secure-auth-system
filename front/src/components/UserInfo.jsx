import { useEffect, useState } from "react";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Function to collect user info and send it to the backend
    const collectUserInfo = async () => {
      try {
        // Get geolocation data (latitude and longitude)
        const geolocation = await new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
            reject(new Error("Geolocation is not supported"));
          }
        });

        const { latitude, longitude } = geolocation.coords;

        // Collect other user data
        const data = {
          phone: "1234567890", // Replace with dynamic data if needed
          country: "USA", // Placeholder, will be set on backend (optional)
          browser: navigator.userAgent, // Browser info from user-agent string
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          location: {
            latitude: latitude, // Dynamic latitude from Geolocation API
            longitude: longitude, // Dynamic longitude from Geolocation API
          },
          operatingSystem: navigator.platform,
          deviceType: /mobile|tablet|ip(hone|od|ad)|android/i.test(
            navigator.userAgent
          )
            ? "mobile"
            : "desktop",
          language: navigator.language,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          currentPage: window.location.href,
          previousPage: document.referrer,
          sessionDuration: 0, // Could be calculated based on time spent on page
          cookies: document.cookie,
          screenOrientation:
            window.innerHeight > window.innerWidth ? "portrait" : "landscape",
          deviceMemory: navigator.deviceMemory || 4,
          cpuClass: navigator.hardwareConcurrency || "unknown",
          colorDepth: window.screen.colorDepth,
          history: [], // User's browsing history can be tracked if needed
          performance: {
            navigationStart: performance.timing.navigationStart,
            loadEventEnd: performance.timing.loadEventEnd,
            domComplete: performance.timing.domComplete,
          },
          phoneModel: "iPhone 12", // Example model (can be parsed from the user-agent)
          batteryLevel: 100, // Dummy value; can be fetched using Battery API if needed
        };

        // Send user data to the backend (IP will be collected on the backend)
        const queryParams = new URLSearchParams(data).toString();
        const response = await fetch(
          `http://localhost:3000/api/user-info?${queryParams}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          console.log("User data saved successfully!");
        } else {
          console.error("Error saving user data");
        }
      } catch (error) {
        console.error("Error collecting user data:", error);
      }
    };

    collectUserInfo(); // Call the function when the component mounts
  }, []); // Empty dependency array to ensure this runs once on mount

  return (
    <div>
      <h1>User Information</h1>
      <p>Data collection in progress...</p>
    </div>
  );
};

export default UserInfo;
