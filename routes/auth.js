import express from "express";
import Joi from "joi";
import _ from "lodash";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Username or Password.");

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("Invalid Username or Password.");
  const token = user.generateJwtPrivate();
  res.send(token);
});

export const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(200).email().required(),
    password: Joi.string().min(8).max(1000).required(),
  });
  return schema.validate(user);
};

export default router;
