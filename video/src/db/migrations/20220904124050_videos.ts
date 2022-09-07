import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("videos", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("title", 1000).notNullable();
    table
      .uuid("category_id")
      .notNullable()
      .references("id")
      .inTable("categories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("video_url", 1000).notNullable();
    table.timestamps(false, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("videos");
}
