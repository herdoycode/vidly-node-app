import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 200,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 120,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.methods.generateJwtPrivate = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

export const User = mongoose.model("User", userSchema);

export const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    email: Joi.string().min(5).max(200).email().required(),
    password: Joi.string().min(8).max(1000).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
};
