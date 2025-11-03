import { Router } from "express";
import { allMessagesGet } from "../controllers/indexController.js";

export const indexRouter = Router()

indexRouter.get("/", allMessagesGet)