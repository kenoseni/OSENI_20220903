import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { options } from "../utils/joi-option";
import { RequestValidationError } from "../errors/request-validation-error";

/**
 * @desc video middleware
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const isValidVideoCred = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().min(1).trim(true).required(),
    categoryId: Joi.string().trim(true).required(),
  });

  const { error } = schema.validate(req.body, options);

  if (error) {
    throw new RequestValidationError([]);
  }
  next();
};
