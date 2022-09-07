import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import videoService from "../../db/queries/videoService";

/**
 * @desc get videos controller
 * @access Public
 * @route Get /api/v1/videos
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that returns the list of videos
 */

export const getVideos = asyncHandler(async (req: Request, res: Response) => {
  const data = await videoService.getvideos();
  res.status(200).json({
    message: "Videos successfully fetched",
    data,
  });
});
