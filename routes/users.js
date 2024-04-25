const { User, validate } = require("../models/user");
const _ =  require('lodash');
const 
const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid User");
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("the user with the given Email already exit");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  res.send(_.pick(user, [name, email]));
});

module.exports = router;
