import { Dialect } from "sequelize/types";

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const config: { [key: string]: DBConfig } = {
  development: {
    username: "root",
    password: "garvit",
    database: "airbnb_booking_dev",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;
module.exports = config;
