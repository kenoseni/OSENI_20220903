import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

/**
 * @desc error handler middleware
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  console.error(err);
  res.status(500).json({
    errors: [{ message: "Something went wrong" }],
  });
};
