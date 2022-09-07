import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("thumbnails", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name", 255).notNullable();
    table.string("thumbnail_url", 1000).notNullable();
    table
      .uuid("video_id")
      .notNullable()
      .references("id")
      .inTable("videos")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("thumbnails");
}
