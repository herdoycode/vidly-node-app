import mongoose from "mongoose";
import Joi from "joi";

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 120,
    required: true,
  },
});

export const Genre = mongoose.model("Genre", genreSchema);

export const validate = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(120).required(),
  });
  return schema.validate(genre);
};
