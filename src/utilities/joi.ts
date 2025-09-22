import Joi from "joi";

export const authVerification = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createProductJoi = Joi.object({
  name: Joi.string().required(),
  costCLP: Joi.number().required(),
  priceARS: Joi.number().required(),
  quantity: Joi.number().required(),
  currentExchangeRate: Joi.number().optional(),
});

export const createAnalysisJoi = Joi.object({
  title: Joi.string().max(150).required(),
  description: Joi.string().allow("").optional(),
  date: Joi.date().required(),
  results: Joi.array()
    .items(
      Joi.object({
        parameter: Joi.string().required(),
        value: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
        unit: Joi.string().optional(),
      })
    )
    .min(1)
    .required(),
});

export const createExchangeJoi = Joi.object({
  userId: Joi.string().required(),
  currentExchangeRate: Joi.number().required(),
});

export const updateExchangeJoi = Joi.object({
  currentExchangeRate: Joi.number().required(),
});
