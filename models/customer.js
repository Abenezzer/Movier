const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      min: 5,
      max: 255,
      trim: true,
      required: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      max: 255,
      min: 5,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    isGold: Joi.bool(),
    phone: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(customer);
}

module.exports = {
  Customer,
  validateCustomer,
};
