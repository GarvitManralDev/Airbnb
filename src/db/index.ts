import { Sequelize } from "sequelize-typescript";
import { Booking } from "./models/Booking";
import config from "./config";
import { IdempotencyKey } from "./models/IdempotencyKey";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

export const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  models: [Booking, IdempotencyKey],
});
