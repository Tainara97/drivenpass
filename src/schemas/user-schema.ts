import Joi from "joi";
import { UserData } from "protocols/user-types";

export const signUpSchema = Joi.object<UserData>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
