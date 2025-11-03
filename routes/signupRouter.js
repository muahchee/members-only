import { Router } from "express";
import { addUserGet, addUserPost } from "../controllers/signupController.js";

export const signupRouter = Router();

signupRouter.get("/", addUserGet)
signupRouter.post("/", addUserPost)