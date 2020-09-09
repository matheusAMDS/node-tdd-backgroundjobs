module.exports = [
  {
    name: "development",
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    entities: [
      "src/app/models/**/*.ts"
    ],
    migrations: [
      "src/database/migrations/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/app/models",
      migrationsDir: "src/database/migrations"
    }
  },
  {
    name: "test",
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      "src/app/models/**/*.ts"
    ],
    migrations: [
      "src/database/migrations/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/app/models",
      migrationsDir: "src/database/migrations"
    }
  }
]