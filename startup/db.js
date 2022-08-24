import mongoose from "mongoose";
import config from "config";
import { logger } from "./logger.js";

const uri = config.get("db");
export const db = mongoose
  .connect(uri)
  .then(() => logger.info("Connected to MongoDB..."))
  .catch((err) => logger.error(`Could not connect to MongoDB ${err}`));
