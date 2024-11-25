import User from "../model/model.js"; // Import User model
import axios from "axios";

// Controller function to handle user info collection
export const userInfo = async (req, res) => {
  try {
    const ip = req.ip; // Get IP address from the request
    const userAgent = req.get("User-Agent"); // Get user-agent (browser & OS info)
    const referrer = req.get("Referer"); // Get the referer URL if available
    const cookies = req.cookies; // Get cookies sent by the browser (if any)
    const currentPage =
      req.protocol + "://" + req.get("Host") + req.originalUrl; // Get the current page URL
    const previousPage = referrer || ""; // Previous page URL (from referer)

    // Use external API (like ip-api) to get location data based on IP
    const geoData = await axios.get(`http://ip-api.com/json/${ip}`);
    const { country, city, lat, lon } = geoData.data; // Extract location data

    // Collect browser and device info
    const deviceType = /mobile|tablet|ip(hone|od|ad)|android/i.test(userAgent)
      ? "mobile"
      : "desktop";
    const operatingSystem = /Windows/i.test(userAgent)
      ? "Windows"
      : /Macintosh/i.test(userAgent)
      ? "Mac OS"
      : /Linux/i.test(userAgent)
      ? "Linux"
      : "Unknown";

    // Collect screen and device information
    const screenResolution = `${req.query.screenWidth || 1920}x${
      req.query.screenHeight || 1080
    }`;
    const language = req.acceptsLanguages()[0]; // Get the user's language preference

    // Collect performance information (optional)
    const performance = {
      navigationStart: Date.now(),
      loadEventEnd: Date.now() + 100, // Dummy values for performance (replace with real data)
      domComplete: Date.now() + 200,
    };

    // Create a new user document
    const newUser = new User({
      ip,
      userAgent,
      referrer,
      currentPage,
      previousPage,
      location: {
        latitude: lat,
        longitude: lon,
      },
      country,
      operatingSystem,
      deviceType,
      screenResolution,
      language,
      performance,
      phoneModel: "N/A", // You can extract this from the userAgent if needed
      batteryLevel: 100, // Example value (use Battery API if required)
    });

    // Save the user data to MongoDB
    await newUser.save();

    // Return success response
    res.status(200).json({ message: "User info saved successfully!" });
  } catch (error) {
    console.error("Error collecting user info:", error);
    res.status(500).json({ message: "Error saving user info", error });
  }
};
