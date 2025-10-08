import { User, UserData } from "protocols/user-types";
import { findByEmail, createUser, deleteAllCredentials, deleteUser } from "../repositories/user-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUserService(userData: UserData) {
    const existingUser = await findByEmail(userData.email);
    if(existingUser) {
        throw {type: "conflict", message: "User already exists"};
    }

    const hashedPassword =  await bcrypt.hash(userData.password, 10);

    const newUserData = {
        ...userData,
        password: hashedPassword
    };

    const newUser = await createUser(newUserData);

    const {password, ...userWithoutPassword} = newUser;
    return userWithoutPassword;
}   

export async function signInUserService(userData: {email: string, password: string}) {
     const existingUser = await findByEmail(userData.email);
     if (!existingUser) {
        throw {type: "notFound", message: "User not found."};
     }

     const validPassword = await bcrypt.compare(userData.password, existingUser.password);
     if (!validPassword) {
        throw {type: "unauthorized", message: "Invalid password."}
     }

     const token = jwt.sign (
        {userId: existingUser.id, email: existingUser.email},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
     );

     return token;
}   

export async function deleteUserService(userId: number) {
    await deleteAllCredentials(userId);

    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
        throw {type: "notFound", message: "User not found."};
    }

    return deletedUser;
}