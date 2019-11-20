const joi = require("joi");
const db = require("./connection");

const schema = joi.object().keys({
  username: joi
    .string()
    .alphanum()
    .required(),
  subject: joi.string().required(),
  message: joi
    .string()
    .max(500)
    .required(),
  imageUrl: joi.string().uri({
    scheme: [/https?/]
  })
});

const messages = db.get("messages");

function getAll() {
  return messages.find();
}

function create(message) {
  if (!message.username) message.username = "Anonymous";

  const result = joi.validate(message, schema);
  if (result.error == null) {
    message.created = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  create,
  getAll
};
