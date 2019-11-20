const joi = require("joi");
const bcrypt = require("bcrypt");
const db = require("./connection");

const schema = joi.object().keys({
  username: joi
    .string()
    .alphanum()
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required()
});

const users = db.get("users");

function getByEmail(email) {
  return users.findOne({ email });
}

function create(user) {
  const result = joi.validate(user, schema);
  if (result.error == null) {
    user.created = new Date();
    user.password = bcrypt.hashSync(user.password, 8);
    return users.insert(user);
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  create,
  getByEmail
};
