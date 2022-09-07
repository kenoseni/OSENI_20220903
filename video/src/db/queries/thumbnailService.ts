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
  bulkStoreThumbnail(data: any[]) {
    knex.transaction(async (trx) => {
      for (const thumbnail of data) {
        trx("thumbnails").insert({ ...thumbnail });
      }
    });
  },
};

export default thumbnailService;
