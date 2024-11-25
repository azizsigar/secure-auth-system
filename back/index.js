import app from "./app.js";
import dotenv from "dotenv/config";
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });