import express from "express";
import "express-async-errors";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(express.json());

app.all("*", async () => {
  throw new NotFoundError("This route is not available");
});

app.use(errorHandler);

export { app };
