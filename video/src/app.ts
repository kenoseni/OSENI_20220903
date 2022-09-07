import express from "express";
import "express-async-errors";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
// @ts-ignore
import PQueue from "pqueue";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { categoryRouter } from "./routes/category";
import { videoRouter } from "./routes/video";
import { thumbnailRouter } from "./routes/thumbnails";

// create instance of FFmpeg
const ffmpeg = createFFmpeg({ log: true });

export const requestQueue = new PQueue({ concurrency: 1 });

// load ffmpeg-core into memory asynchronously and returns a promise
let ffmpegLoadingPromise: Promise<void> | null = ffmpeg.load();

export const getFFmpeg = async () => {
  if (ffmpegLoadingPromise) {
    await ffmpegLoadingPromise;
    ffmpegLoadingPromise = null;
  }
  return ffmpeg;
};

const app = express();

// Body parser
app.use(express.json());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/thumbnails", thumbnailRouter);

app.all("*", async () => {
  throw new NotFoundError("This route is not available");
});

app.use(errorHandler);

export { app };
