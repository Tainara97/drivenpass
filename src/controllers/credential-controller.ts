import { Response } from "express";
import { CredentialData } from "../protocols/credential-types";
import { createCredentialService, getCredentialByIdService, getCredentialsService, updateCredentialsService } from "../services/credential-service";
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
    const credentialId = Number(req.params.id)

    const credential = await getCredentialByIdService(userId, credentialId);

    res.status(200).send(credential);
}

export async function updateCredentials(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    const userId = req.userId;
    const credentialData = req.body;

    await updateCredentialsService(id, userId, credentialData);

    return res.sendStatus(204);
}