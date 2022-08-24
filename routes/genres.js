import express from "express";
import { Genre, validate } from "../models/genre.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const gneres = await Genre.find().sort("name");
  res.send(gneres);
});

router.get("/:id", async (req, res) => {
  const gnere = await Genre.findById(req.params.id);
  if (!gnere) return res.status(404).send("Genre not found.");
  res.send(gnere);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const gnere = new Genre({
    name: req.body.name,
  });
  await gnere.save();
  res.send(gnere);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const gnere = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!gnere) return res.status(404).send("Genre not found.");
  res.send(gnere);
});

router.delete("/:id", admin, async (req, res) => {
  const gnere = await Genre.findByIdAndRemove(req.params.id);
  if (!gnere) return res.status(400).send("Genre already deleted.");
  res.send(gnere);
});

export default router;
