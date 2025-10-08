import prisma from "../database";
import { UserData } from "protocols/user-types";

export async function findByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {email}
    });

}

export async function createUser(userData: UserData) {
    const user = await prisma.user.create({
       data: userData
    });

    return user;
}

export async function deleteUser(userId: number) {
    return prisma.user.delete({
        where: {id: userId}
    });
}

export async function deleteAllCredentials(userId: number) {
    return prisma.credentials.deleteMany({
        where: {userId}
    });
}