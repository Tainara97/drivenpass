import { Response } from "express";
import { CredentialData } from "../protocols/credential-types";
import { createCredentialService, getCredentialByIdService, getCredentialsService } from "../services/credential-service";
import { AuthRequest } from "types/express";

export async function createCredential(req: AuthRequest, res: Response) {
    const credentialData = req.body as CredentialData;
    const userId = req.userId;

    const credential = await createCredentialService(credentialData, userId);

    res.status(201).send(credential);

}

export async function getCredentials(req: AuthRequest, res: Response) {
    const userId = req.userId;
    const credentials = await getCredentialsService(userId);

    res.status(200).send(credentials);
}

export async function getCredentialById(req: AuthRequest, res: Response) {
    const userId = req.userId;
    const { id } = req.params;
    const credentialId = Number(id)

    if (isNaN(credentialId) || credentialId <= 0) {
        return res.sendStatus(400);
    }

    const credential = await getCredentialByIdService(userId, credentialId);

    res.status(200).send(credential);
}