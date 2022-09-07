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

export const getThumbnail = asyncHandler(
  async (req: Request, res: Response) => {
    const { videoId } = req.params;

    const video = await videoService.findVideoById(videoId);

    if (!video) {
      throw new NotFoundError("Category not found.");
    }
    const thumbnail = await thumbnailService.findThumbnailByIdAndName(
      videoId,
      "256x256"
    );
    res.status(200).json({
      message: "Thumbnail successfully fetched.",
      data: thumbnail,
    });
  }
);
