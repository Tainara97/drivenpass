import { Request, Response, NextFunction } from "express";

export function validateIdParam(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (!id || id <= 0) {
    return res.status(400).send({ message: "Invalid ID parameter" });
  }

  next();
}
