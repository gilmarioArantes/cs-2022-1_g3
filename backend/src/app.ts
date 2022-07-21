import express from "express";
import cors from "cors";
import passport from "passport";
import * as swaggerUI from "swagger-ui-express";

import config from "./config";
import { swaggerDocument } from "./config/swagger";

import routes from "./routes";

import morgan from "./middlewares/LoggerMiddleware";
import Logger from "./utils/logger.utils";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);
app.use(cors());
app.use(passport.initialize());
app.use(morgan);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.use("/api", routes);

const server = app.listen(config.appPort, () => {
  Logger.debug(`Server is up and running @ http://localhost:${config.appPort}`);
});

export default server;
