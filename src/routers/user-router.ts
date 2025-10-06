import { createUser, signInUser } from "../controllers/user-controller";
import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { signInSchema, signUpSchema } from "../schemas/user-schema";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema), createUser);
userRouter.post("/sign-in", validateSchema(signInSchema), signInUser);

export default userRouter;