import multer from "multer";
import { Request } from "express";
import { BadRequestError } from "../errors/bad-request-error";

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (!file.originalname.match(/\.(mp4|mov)$/)) {
    return cb(new BadRequestError("File must be either mp4, mov"));
  }
  cb(null, true);
};

export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // max file 200MB
}).single("video");
