import { Request, Response } from "express";
import { UserData, User } from "protocols/types";
import { createUserService, signInUserService } from "../services/user-service";

export async function createUser(req: Request, res: Response) {
    const newUser = await createUserService(req.body as UserData);

    res.status(201).send(newUser);
}

export async function signInUser(req: Request, res: Response) {
    const token = await signInUserService(req.body as { email: string; password: string });

    res.status(200).send({ token });
}