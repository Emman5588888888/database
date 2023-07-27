const Joi = require("joi");

// sign up validation
function validateSignup(data) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().label("First name"),
    lastName: Joi.string().min(2).max(50).required().label("Last name"),
    phone: Joi.string().min(11).max(15).required().label("Phone no"),
    city: Joi.string().min(3).max(50).required().label("City"),
    country: Joi.string().min(2).max(50).required().label("Country"),
    email: Joi.string().email().required().label("Email Address"),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(16)
      .required()
      .label("Password"),
  });

  return schema.validate(data);
}

// sign in validation
function validateSignin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
}

// Update user validation
function validateUser(data) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().label("First name"),
    lastName: Joi.string().min(2).max(50).required().label("Last name"),
    phone: Joi.string().min(11).max(15).required().label("Phone no"),
    city: Joi.string().min(3).max(50).required().label("City"),
    country: Joi.string().min(2).max(50).required().label("Country"),
  });

  return schema.validate(data);
}

module.exports.validateSignup = validateSignup;
module.exports.validateSignin = validateSignin;
module.exports.validateUser = validateUser;
