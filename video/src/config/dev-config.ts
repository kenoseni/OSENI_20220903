import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

export const devConfig = {
  client: process.env.CLIENT || "pg",
  connection: process.env.DEV_DB_CONNECTION || "postgres://localhost/video_api",
  migrations: {
    tableName: "knex_migrations",
    directory: path.join(__dirname, "../db/migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "../db/seeds"),
  },
  debug: true,
};
