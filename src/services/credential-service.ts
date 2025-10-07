import Cryptr from "cryptr";
import { CredentialData } from "../protocols/credential-types";
import { createCredential, findByTitle, getCredentialById, getCredentials } from "../repositories/credential-repository";
import { number } from "joi";

const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

export async function createCredentialService(credentialData: CredentialData, userId: number) {
    const existingCredential = await findByTitle(credentialData.title, userId);
    if (existingCredential) {
        throw { type: "conflict", message: "Credential title already exists." };
    }

    const encryptedPassword = cryptr.encrypt(credentialData.password);

    const newCredential = await createCredential(
        {
            ...credentialData,
            password: encryptedPassword
        },
        userId
    );
    
    return newCredential;
}

export async function getCredentialsService(userId: number) {
    const credentials = await getCredentials(userId);

    const decryptedCredentials = credentials.map(credential => ({
        ...credential,
        password: cryptr.decrypt(credential.password)
    }));

    return decryptedCredentials;
}

export async function getCredentialByIdService(userId: number, id: number) {
    const credential = await getCredentialById(userId, id);
    if (!credential) {
        throw {type: "notFound", message: "Credential not found."}
    }

    const decryptedCredential = {
        ...credential,
        password: cryptr.decrypt(credential.password)
    };

    return decryptedCredential;
}