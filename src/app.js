const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const messages = require("./db/messages");

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Behold the MEVN Stack!"
  });
});

app.get("/messages", (req, res) => {
  messages.getAll().then(messages => {
    res.json(messages);
  });
});

app.post("/messages", (req, res) => {
  console.log(req.body);
  messages
    .create(req.body)
    .then(message => {
      res.json(message);
    })
    .catch(error => {
      res.status(500);
      res.json(error);
    });
});

module.exports = app;
