import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: false,
    })
    .required(),
  password: Joi.string().min(6).required(),
});
