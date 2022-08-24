import express from "express";
import "express-async-errors";
import { logger } from "./startup/logger.js";
import { routes } from "./startup/routes.js";

const app = express();
routes(app);
import "./startup/db.js";

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
