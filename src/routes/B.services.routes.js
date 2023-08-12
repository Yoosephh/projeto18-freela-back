import { Router } from "express";
import { validateSchemas } from "../middlewares/validateSchema.middleware.js";
import { getService, getServices } from "../controllers/B.services.controllers.js";
import { checkToken } from "../middlewares/checkToken.middleware.js";

const BSRouter = Router()

BSRouter.get("/services", checkToken(), getServices)
BSRouter.get("/services/:id", checkToken(), getService)

export default BSRouter