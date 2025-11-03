import { Router } from "express";
import { joinGet, joinPost } from "../controllers/joinController.js";

export const joinRouter = Router();

joinRouter.get("/", joinGet);
joinRouter.post("/", joinPost);
