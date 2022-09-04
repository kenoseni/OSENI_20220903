import { default as knex } from "../index";

const categoryFields = ["id", "category", "createdAt", "updatedAt"];

const categoryService = {
  getAllCategories() {
    return knex("categories").returning(categoryFields);
  },
};

export default categoryService;
