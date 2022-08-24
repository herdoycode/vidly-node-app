import express from "express";
import genres from "../routes/genres.js";
import movies from "../routes/movies.js";
import users from "../routes/users.js";
import login from "../routes/auth.js";
import { auth } from "../middleware/auth.js";
import { error } from "../middleware/error.js";

export const routes = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/genres", auth, genres);
  app.use("/api/movies", auth, movies);
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use(error);
};
