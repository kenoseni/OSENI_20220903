import { default as knex } from "../index";

const videoFields = ["id", "categoryId", "videoUrl", "createdAt", "updatedAt"];

type VideoData = {
  title: string;
  categoryId: string;
};

const videoService = {
  storeVideo(data: VideoData) {
    return knex("videos")
      .insert({ ...data })
      .returning(videoFields);
  },
};

export default videoService;
