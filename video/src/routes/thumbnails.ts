import express from "express";
import { generateThumbnail } from "../controllers/thumbnail/generate-thumbnail";
import { getAllThumbnails } from "../controllers/thumbnail/getAllThumbnails";
import { getThumbnail } from "../controllers/thumbnail/getThumbnail";

const router = express.Router();

router.post("/:videoId", generateThumbnail);
router.get("/:videoId", getThumbnail);
router.get("", getAllThumbnails);

export { router as thumbnailRouter };
