import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: false,
    })
    .required(),
  password: Joi.string().min(6).required(),
});
