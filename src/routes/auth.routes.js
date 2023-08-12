import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { validateSchemas } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";

const authRouter = Router()

authRouter.post("/signin", validateSchemas(signInSchema), signIn)
authRouter.post("/signup", validateSchemas(signUpSchema), signUp)

export default authRouter