import { createUser } from "../controllers/user-controller";
import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { signUpSchema } from "../schemas/user-schema";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema), createUser);

export default userRouter;