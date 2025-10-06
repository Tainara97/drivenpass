import { NextFunction, Request, Response } from "express";

type CostumError = {
    type: "conflict" | "notFound" | "unprocessable";
    message: string;
};

export default function errorHandler(
    error: CostumError | any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.type === "conflict") {
        return res.status(409).send(error.message);
    }

    if (error.type === "notFound") {
        return res.status(404).send(error.message);
    }

    if (error.type === "unprocessable") {
        return res.status(422).send(error.message);
    }

    if (error.type === "unauthorized") {
        return res.status(401).send(error.message);
    }

    return res.status(500).send("Internal server error");

}
