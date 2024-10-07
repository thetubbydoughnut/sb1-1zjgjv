import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations"
    }
  }
};

export default config;