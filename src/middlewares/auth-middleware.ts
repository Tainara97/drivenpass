import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "types/express";

export function validateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  Promise.resolve()
    .then(() => {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
      req.userId = payload.userId;
      next();
    })
    .catch(() => res.sendStatus(401)); 
}
