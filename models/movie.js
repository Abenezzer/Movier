const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Moive",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      max: 255,
      min: 1,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      max: 255,
      min: 0,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      max: 255,
      min: 0,
    },
  })
);

function validateMoive(movie) {
  const schema = Joi.object({
    title: Joi.string().max(255).min(1).required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().max(255).min(0).required(),
    dailyRentalRate: Joi.number().max(255).min(0).required(),
  });

  return schema.validate(movie);
}

module.exports = {
  Movie,
  validate: validateMoive,
};
