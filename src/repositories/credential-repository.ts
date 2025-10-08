import prisma from "../database";
import { CredentialData } from "../protocols/credential-types";

export async function createCredential(credentialData: CredentialData, userId: number) {
    return prisma.credentials.create({
        data: {...credentialData, userId}
    });
}

export async function findByTitle(title: string, userId: number) {
    return prisma.credentials.findFirst({
        where: {title, userId}
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

export async function updateCredentials(id: number, userId: number, credentialData: CredentialData) {
    const existingCredential = await prisma.credentials.findFirst({
        where: {id, userId}
    });

    if(!existingCredential) return null;

    const uptdatedCredential = await prisma.credentials.update({
        where: {id: existingCredential.id},
        data: {
            title: credentialData.title,
            url: credentialData.url,
            username: credentialData.username,
            password: credentialData.password
        }
    });

    return uptdatedCredential;
}

export async function deleteCredential(id: number, userId: number) {
    const existingCredential = await prisma.credentials.findFirst({
        where: {id, userId}
    })

    if (!existingCredential) return null;

    const deletedCredential = await prisma.credentials.delete({
        where: {id}
    });

    return deletedCredential;
}



