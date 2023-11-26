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
  const amountValidatorSchema = rateValidatorSchema.append({
    amount: Joi.number().required(),
  });
  const amount: RequestHandler = (req, res, next) => {
    try {
      const result = amountValidatorSchema.validate(req.query);
      if (result.error) {
        throw result.error;
      }
      res.locals = result.value;
      next();
    } catch (error) {
      next(error);
    }
  };
  const getListSchema = Joi.object({
    transaction_id: Joi.string().required(),
  });
  const getList: RequestHandler = (req, res, next) => {
    try {
      const result = getListSchema.validate(req.query);
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
    amount,
    getList,
  };
};
