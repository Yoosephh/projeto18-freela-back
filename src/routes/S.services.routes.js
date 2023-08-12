import { Router } from "express";
import { validateSchemas } from "../middlewares/validateSchema.middleware.js";
import { createService, deleteService, myServices, updateService } from "../controllers/S.services.controllers.js";
import { checkToken } from "../middlewares/checkToken.middleware.js";
import { newServiceSchema } from "../schemas/services.schemas.js";

const SSRouter = Router()

SSRouter.post("/service", validateSchemas(newServiceSchema), createService)
SSRouter.put("/service/:id", checkToken(), updateService)
SSRouter.delete("/service/:id", checkToken(), deleteService)
SSRouter.get("/service/:id", checkToken(), myServices)

export default SSRouter