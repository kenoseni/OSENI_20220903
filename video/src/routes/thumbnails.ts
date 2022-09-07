import express from "express";
import { generateThumbnail } from "../controllers/thumbnail/generate-thumbnail";
import { getThumbnail } from "../controllers/thumbnail/getThumbnail";

const router = express.Router();

router.post("/:videoId", generateThumbnail);
router.get("/:videoId", getThumbnail);

export { router as thumbnailRouter };
