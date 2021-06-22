require("dotenv").config();

const express = require("express");

const sequelize = require("./sequelize");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
