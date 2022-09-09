import { default as knex } from "../index";

const thumbnailFields = [
  "id",
  "videoId",
  "name",
  "thumbnailUrl",
  "createdAt",
  "updatedAt",
];

type ThumbnailData = {
  videoId: string;
  name: string;
  thumbnailUrl: string;
};

const thumbnailService = {
  findThumbnailByIdAndName(id: string, name: string) {
    return knex("thumbnails")
      .where({ id })
      .andWhere({ name })
      .first(thumbnailFields);
  },
  getAllThumbnails() {
    return knex("thumbnails").returning(thumbnailFields);
  },
  async bulkStoreThumbnail(data: any[]) {
    const thumbnails = [];
    for (const thumbnail of data) {
      thumbnails.push(thumbnail);
    }
    return knex("thumbnails").insert(thumbnails).returning(thumbnailFields);
  },
};

export default thumbnailService;
