import { Request, Response, NextFunction } from "express";

/**
 * @desc Resolves async functions or catches an error
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next http response
 * @returns { Promise<void> }
 */

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
