import mongoose from "mongoose";
import Joi from "joi";
import { genreSchema } from "./genre.js";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 120,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);

export const validate = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(120).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  });
  return schema.validate(movie);
};
