import { UserData } from "protocols/types";
import { findByEmail, createUser } from "../repositories/user-repository";
import bcrypt from "bcrypt";

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