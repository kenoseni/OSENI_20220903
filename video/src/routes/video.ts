import express from "express";

import { uploadVideo } from "../middlewares/multer-upload";
import { videoUpload } from "../controllers/video/upload-video";
import { isValidVideoCred } from "../middlewares/isValidVideoCred";
import { getVideos } from "../controllers/video/get-videos";

const router = express.Router();

router.post("", [uploadVideo, isValidVideoCred], videoUpload);
router.get("", getVideos);

export { router as videoRouter };
