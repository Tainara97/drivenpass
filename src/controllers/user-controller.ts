import { NextFunction, Request, Response } from "express";
import { UserData, User } from "protocols/user-types";
import { createUserService, deleteUserService, signInUserService } from "../services/user-service";
import { AuthRequest } from "types/express";

export async function createUser(req: Request, res: Response) {
    const newUser = await createUserService(req.body as UserData);

    res.status(201).send(newUser);
}

export async function signInUser(req: Request, res: Response) {
    const token = await signInUserService(req.body as { email: string; password: string });

    res.status(200).send({ token });
}

export async function deleteUser(req: AuthRequest, res: Response) {
    const userId = req.userId;

    await deleteUserService(userId);

    res.sendStatus(204);
    
}