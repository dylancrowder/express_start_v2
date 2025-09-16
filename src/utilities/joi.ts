import Joi from "joi";

export const authVerification = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
