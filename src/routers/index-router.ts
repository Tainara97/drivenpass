import { Router } from "express";
import userRouter from "./user-router";
import credentialRouter from "./credential-router";

const router = Router();

router.use(userRouter);
router.use(credentialRouter);

export default router;