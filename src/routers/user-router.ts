import { createUser, deleteUser, signInUser } from "../controllers/user-controller";
import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { signInSchema, signUpSchema } from "../schemas/user-schema";
import { validateToken } from "../middlewares/auth-middleware";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema), createUser);
userRouter.post("/sign-in", validateSchema(signInSchema), signInUser);
userRouter.delete("/erase", validateToken, deleteUser);

export default userRouter;