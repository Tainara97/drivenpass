import prisma from "../database";
import { CredentialData } from "../protocols/credential-types";

export async function createCredential(credentialData: CredentialData, userId: number) {
    return prisma.credentials.create({
        data: {
            ...credentialData,
            userId
        }
    });
}

export async function findByTitle(title: string, userId: number) {
    return prisma.credentials.findFirst({
        where: {
            title,
            userId
        }
    });
}