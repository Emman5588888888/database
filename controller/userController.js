const users = require("../data/users");
const User = require("../models/User");
const {
  validateSignup,
  validateSignin,
  validateUser,
} = require("../validation/userValidation");

const createUser = async (req, res) => {
  // validate the body of the request
  const { error } = validateSignup(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    console.log("user");
    res.status(400).json({ message: "Email already exist" });
    return;
  }

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
    email: req.body.email,
    password: req.body.password,
  });

  await newUser.save();

  res.status(201).json({ message: "Account created successfully" });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
};

const signin = async (req, res) => {
  // validate the body of the request
  try {
    const { error } = validateSignin(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    // const {email, password} = req.body

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    user.password = undefined;

    res.json({ message: "Sign in successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occured");
  }
};

const updateUser = async (req, res) => {
  // validate
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  // find the user
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: `User with ${req.params.id} not found` });
    return;
  }

  // update the user
  const { firstName, lastName, phone, city, country } = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.phone = phone;
  user.city = city;
  user.country = country;

  await user.save();

  user.password = undefined;

  res.send({ message: "User successfuly updated", user });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: `User with ${req.params.id} not found` });
    return;
  }

  await user.deleteOne();

  res.send({ message: "User successfuly deleted" });
};

const getUsersByLocation = async (req, res) => {
  const field = req.query.field;
  const value = req.query.value;

  const users = await User.find({ [field]: value }).select("-password");

  res.json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: `User with ${req.params.id} not found` });
    return;
  }

  user.password = undefined;

  res.json({ user });
};

// comparison operators
// eq: equal to
// lte: less than or equal to
// gte: greater than or equal to
// lt: less than
// gt: greater than
// ne: not equal to
// in:
// nin: not in

// Logical operators
// or
// and

const getUserBy = async (req, res) => {
  const users = await User.find().and([
    { country: "Nigeria" },
    { role: "user" },
  ]);

  res.send(users);
};

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.signin = signin;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUsersByLocation = getUsersByLocation;
module.exports.getSingleUser = getSingleUser;
module.exports.getUserBy = getUserBy;
