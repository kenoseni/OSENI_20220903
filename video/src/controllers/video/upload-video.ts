import { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { NotFoundError } from "../../errors/not-found-error";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { uploadVideoToCloudinary } from "../../services/cloudinary/upload";
import categoryService from "../../db/queries/categoryService";
import videoService from "../../db/queries/videoService";

/**
 * @desc video upload controller
 * @access Public
 * @route Post /api/v1/videos
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that returns the video object
 */

export const videoUpload = asyncHandler(async (req: Request, res: Response) => {
  if (req.file === undefined) {
    throw new BadRequestError("You must select a file to upload.");
  }
  const { id: categoryId } = await categoryService.findCategortById(
    req.body.categoryId
  );

  if (!categoryId) {
    throw new NotFoundError("Category not found.");
  }
  const videoUrl = await uploadVideoToCloudinary(req.file);

  const data = await videoService.storeVideo({
    ...req.body,
    categoryId,
    videoUrl,
  });

  res.status(200).json({
    message: "Video successfully uploaded.",
    data,
  });
});
