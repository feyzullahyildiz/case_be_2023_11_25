import type { RequestHandler } from 'express';
import Joi from 'joi';

export const createExchangeValidatorMiddlewares = () => {
  const rateValidatorSchema = Joi.object({
    source: Joi.string().min(2).required(),
    targets: Joi.string()
      .trim()
      .required()
      .custom((value) => value.split(',')),
  });
  const rate: RequestHandler = (req, res, next) => {
    try {
      const result = rateValidatorSchema.validate(req.query);
      if (result.error) {
        throw result.error;
      }
      res.locals = result.value;
      next();
    } catch (error) {
      next(error);
    }
  };

  return {
    rate,
  };
};
