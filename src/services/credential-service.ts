import Cryptr from "cryptr";
import { CredentialData } from "../protocols/credential-types";
import { createCredential, findByTitle } from "../repositories/credential-repository";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);

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