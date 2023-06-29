import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER_NAME, DB_USER_PASSWORD } from "./private";

export default new Sequelize(DB_NAME, DB_USER_NAME, DB_USER_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});
