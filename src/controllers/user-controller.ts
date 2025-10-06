import { Request, Response } from "express";
import { UserData } from "protocols/types";
import { createUserService } from "../services/user-service";

export async function createUser(req: Request, res: Response) {
    const newUser = await createUserService(req.body as UserData);

    res.status(201).send(newUser);
}