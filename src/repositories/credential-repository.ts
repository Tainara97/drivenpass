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

export async function getCredentials(userId: number) {
    const credentials = await prisma.credentials.findMany({
        where: {userId}
    });

    return credentials;
}

export async function getCredentialById(userId: number, id: number) {
    const credential = await prisma.credentials.findFirst({
        where: {id, userId}
    })

    return credential;
}



