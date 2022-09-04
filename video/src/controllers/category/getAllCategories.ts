import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import categoryService from "../../db/queries/categoryService";

/**
 * @desc Get all categories controller
 * @access Public
 * @route Get /api/v1/categories
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that returns list of categories
 */

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      message: "Categories successfully fetched.",
      data: categories,
    });
  }
);
