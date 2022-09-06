import express from "express";

import { uploadVideo } from "../middlewares/multer-upload";
import { videoUpload } from "../controllers/video/upload-video";
import { isValidVideoCred } from "../middlewares/isValidVideoCred";

const router = express.Router();

router.post("", [uploadVideo, isValidVideoCred], videoUpload);

export { router as videoRouter };
