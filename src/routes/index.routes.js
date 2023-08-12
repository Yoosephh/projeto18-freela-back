import { Router } from "express";
import authRouter from "./auth.routes.js";
import SSRouter from "./S.services.routes.js";
import BSRouter from "./B.services.routes.js";

const router = Router();

router.use(authRouter);
router.use(SSRouter);
router.use(BSRouter);

export default router;