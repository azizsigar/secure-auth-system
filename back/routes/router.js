import express from "express";
import { userInfo } from "../controller/controller.js";
const router = express.Router();
router.get("/user-info", userInfo);
export default router;
