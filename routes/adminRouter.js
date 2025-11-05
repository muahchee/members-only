import { Router } from "express";
import { adminGet, adminPost } from "../controllers/adminController.js";

export const adminRouter = Router();

adminRouter.get("/", adminGet);
adminRouter.post("/", adminPost);