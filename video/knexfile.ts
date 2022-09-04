// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import { devConfig } from "./src/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    ...devConfig,
  },
};

export default config;
