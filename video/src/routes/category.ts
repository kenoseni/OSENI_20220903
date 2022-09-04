import express from "express";
import { getAllCategories } from "../controllers/category/getAllCategories";

const router = express.Router();

router.get("", getAllCategories);

export { router as categoryRouter };
