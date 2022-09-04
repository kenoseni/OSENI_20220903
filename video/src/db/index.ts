import knex from "knex";

// @ts-ignore
import knexStringcase from "knex-stringcase";
import config from "../../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment as keyof typeof config];

const options = knexStringcase(environmentConfig);

const db = knex(options);

export default db;
