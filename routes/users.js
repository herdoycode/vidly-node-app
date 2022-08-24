import express from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import { User, validate } from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.generateJwtPrivate();
  await user.save();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

export default router;
