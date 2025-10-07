import { Response } from "express";
import { CredentialData } from "../protocols/credential-types";
import { createCredentialService } from "../services/credential-service";
import { AuthRequest } from "types/express";

export async function createCredential(req: AuthRequest, res: Response) {
    const credentialData = req.body as CredentialData;
    const userId = req.userId;

    const credential = await createCredentialService(credentialData, userId);

    res.status(201).send(credential);

}