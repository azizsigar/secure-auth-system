import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
const app = express();

app.use(express.json());
connectDB();
app.use(cors());

app.use("/api", router);

export default app;
