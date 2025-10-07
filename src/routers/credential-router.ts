import { createCredential } from "../controllers/credential-controller";
import { Router } from "express";
import { validateToken } from "../middlewares/auth-middleware";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, createCredential);

export default credentialRouter;