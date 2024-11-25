import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import connectDB from "./config/db.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's URL if different
  methods: "GET,POST",
  credentials: true, // Allow cookies if necessary
};

app.use(cors(corsOptions)); // Add CORS middleware
app.use(express.json()); // Parse JSON requests

connectDB(); // Connect to MongoDB
app.use("/api", router); // Use your routes for the API

export default app;
