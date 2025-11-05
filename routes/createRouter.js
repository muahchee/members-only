import { Router } from "express";
import { createGet, createPost } from "../controllers/createController.js";

export const createRouter = Router();

createRouter.get("/", createGet);
createRouter.post("/", createPost);
