import { ErrorRequestHandler } from 'express';
import { BaseError, ResponseBodyError } from '../error';
import Joi from 'joi';

export const getDefaultErrorHandler = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ResponseBodyError) {
      res.status(err.statusCode).json(err.body);
      return;
    }
    if (err instanceof Joi.ValidationError && err.isJoi) {
      res.status(400).json({
        success: false,
        message: err.message,
        details: err.details,
      });
      return;
    }
    if (err instanceof BaseError) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
      return;
    }
    const message = (err && err.message) || 'Unknown error';
    res.status(500).json({
      success: false,
      message,
    });
  };
  return handler;
};
