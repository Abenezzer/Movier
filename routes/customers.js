const express = require("express");
const { Customer, validateCustomer } = require("../models/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customer = await Customer.find();
    res.send(customer);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    });
    await customer.save();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res) => {
  // check if the id is valid
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res.status(400).send("threre is no customer with the given Id");
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  //check if the id exist
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send("Invalid Id");
  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
  res.send(deletedCustomer);
});

//get by id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) res.status(400).send("Invalid Id");
  res.send(customer);
});

module.exports = router;
