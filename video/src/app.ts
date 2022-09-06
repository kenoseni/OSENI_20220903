import express from "express";
import "express-async-errors";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
// @ts-ignore
import PQueue from "pqueue";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { categoryRouter } from "./routes/category";
import { videoRouter } from "./routes/video";

const app = express();

// Body parser
app.use(express.json());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/videos", videoRouter);

app.all("*", async () => {
  throw new NotFoundError("This route is not available");
});

app.use(errorHandler);

export { app };
