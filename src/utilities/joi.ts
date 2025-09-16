import Joi from "joi";

export const authVerification = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createProductJoi = Joi.object({
  name: Joi.string().required(),
  costCLP: Joi.number().required(),
  priceARS: Joi.number().required(),
  quantity: Joi.number().required(),
});
