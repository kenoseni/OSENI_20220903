import fs from "fs";
// @ts-ignore
import genThumbnail from "simple-thumbnail";
import { Request, Response } from "express";
import path from "path";
import { asyncHandler } from "../../middlewares/asyncHandler";
import videoService from "../../db/queries/videoService";
import thumbnailService from "../../db/queries/thumbnailService";
import { NotFoundError } from "../../errors/not-found-error";
import { getThumbnailDetails } from "../../utils/thumbnail-details";
import { uploadImageWithStream } from "../../services/cloudinary/upload";
import { any } from "joi";

/**
 * @desc thumbnail upload controller
 * @access Public
 * @route Post /api/v1/thumbnails
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that returns list of thumbnails for a video
 */

type ThumbnailData = {
  videoId: string;
  name: string;
  thumbnailUrl: string;
};

export const generateThumbnail = asyncHandler(
  async (req: Request, res: Response) => {
    const { videoId } = req.params;

    const video = await videoService.findVideoById(videoId);

    if (!video) {
      throw new NotFoundError("Video not found.");
    }

    const sizes = ["64x64", "128x128", "256x256"];

    let thumbs1, thumbs2, thumbs3;

    for (const size of sizes) {
      await genThumbnail(
        video.videoUrl,
        path.join(__dirname, `${size}.png`),
        size,
        {
          seek: "00:00:01.00",
        }
      );
      if (size === "64x64") {
        thumbs1 = await getThumbnailDetails("64x64", videoId);
      } else if (size === "128x128") {
        thumbs2 = await getThumbnailDetails("128x128", videoId);
      } else if (size === "256x256") {
        thumbs3 = await getThumbnailDetails("256x256", videoId);
      }
      fs.unlink(path.join(__dirname, `/${size}.png`), () => {
        console.log("done");
      });
    }

    await thumbnailService.bulkStoreThumbnail([thumbs1, thumbs2, thumbs3]);

    res.status(200).json({
      message: "Thumbnails uploaded",
    });
  }
);
