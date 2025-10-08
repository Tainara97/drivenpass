import { createCredential, deleteCredential, getCredentialById, getCredentials, updateCredentials } from "../controllers/credential-controller";
import { Router } from "express";
import { validateToken } from "../middlewares/auth-middleware";
import { validateSchema } from "../middlewares/schema-middleware";
import credentialSchema from "../schemas/credential-schema";
import { validateIdParam } from "../middlewares/id-middleware";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, validateSchema(credentialSchema), createCredential);
credentialRouter.get("/credentials", validateToken, getCredentials);
credentialRouter.get("/credentials/:id", validateToken, validateIdParam, getCredentialById);
credentialRouter.put("/credentials/:id", validateToken, validateIdParam, validateSchema(credentialSchema), updateCredentials);
credentialRouter.delete("/credentials/:id", validateToken, validateIdParam, deleteCredential);

export default credentialRouter;