import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import thumbnailService from "../../db/queries/thumbnailService";
import { NotFoundError } from "../../errors/not-found-error";
import videoService from "../../db/queries/videoService";

/**
 * @desc Get a thumbnail by video controller
 * @access Public
 * @route Get /api/v1/thumbnails
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that returns a thumbnail
 */

export const getAllThumbnails = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await thumbnailService.getAllThumbnails();
    res.status(200).json({
      message: "Thumbnails successfully fetched.",
      data,
    });
  }
);
