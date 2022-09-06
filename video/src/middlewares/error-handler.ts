import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

/**
 * @desc error handler middleware
 * @param {Error} err error object
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object
 */

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

export const errorHandler = (
  err: NodeJS.ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  // From multer error
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      errors: [{ message: "File field name must be 'video'" }],
    });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      errors: [
        {
          message:
            "This file is too large. The maximum supported video size is 200MB",
        },
      ],
    });
  }

  console.error(err);
  res.status(500).json({
    errors: [{ message: "Something went wrong" }],
  });
};
