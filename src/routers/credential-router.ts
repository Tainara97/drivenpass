import { createCredential, getCredentialById, getCredentials } from "../controllers/credential-controller";
import { Router } from "express";
import { validateToken } from "../middlewares/auth-middleware";
import { validateSchema } from "../middlewares/schema-middleware";
import credentialSchema from "../schemas/credential-schema";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, validateSchema(credentialSchema), createCredential);
credentialRouter.get("/credentials", validateToken, getCredentials);
credentialRouter.get("/credentials/:id", validateToken, getCredentialById);

export default credentialRouter;