import { Knex } from "knex";
import { categories } from "../../utils/seeds/categories";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex: Knex): Promise<void> {
  const newCategories = categories();
  // Deletes ALL existing entries
  await knex("categories").del();

  // Inserts categories seed entries
  await knex("categories").insert(newCategories);
}
