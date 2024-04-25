const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 0,
    max: 255,
    trim: true,
  },
});

const Genre = mongoose.model("Gener", genreSchema);

function validateGenre(gener) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(gener);
}

module.exports = {
  validateGenre,
  Genre,
  genreSchema,
};
