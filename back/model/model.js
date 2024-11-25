// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: String, // User phone
  country: String, // Country information
  browser: String, // Browser information
  timezone: String, // Timezone
  ip: String, // IP address
  location: {
    // Geographical location
    latitude: Number,
    longitude: Number,
  },
  operatingSystem: String, // Operating system
  deviceType: String, // Device type (mobile, tablet, pc)
  language: String, // Browser language
  screenResolution: String, // Screen resolution
  referrer: String, // Referrer URL
  userAgent: String, // Full user-agent information
  currentPage: String, // Current page URL
  previousPage: String, // Previous page URL
  sessionDuration: Number, // Time spent on the page
  cookies: Object, // User's cookie information
  screenOrientation: String, // Screen orientation (portrait/landscape)
  deviceMemory: Number, // Device memory
  cpuClass: String, // CPU class
  colorDepth: Number, // Screen color depth
  history: [String], // User's browsing history
  performance: {
    // Browser performance data
    navigationStart: Number,
    loadEventEnd: Number,
    domComplete: Number,
  },
  phoneModel: String, // Phone model
  batteryLevel: Number, // Battery percentage
  createdAt: { type: Date, default: Date.now }, // Created date
});

const User = mongoose.model("User", userSchema);

export default User;
