const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 5,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxLength: 255,
    minLength: 8,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 40,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(50),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validate: validateUser,
};
