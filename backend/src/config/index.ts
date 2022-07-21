import { config } from "dotenv";

config();

export default {
  // application configurations
  appName: process.env.APP_NAME || "",
  appPort: process.env.APP_PORT || 3000,

  // database configurations
  databaseHost: process.env.DB_HOST || "",
  databaseUser: process.env.DB_USER || "root",
  databasePassword: process.env.DB_PASS || "",
  databaseName: process.env.DB_NAME || "",
  databasePort: process.env.DB_PORT || 3306,
};
