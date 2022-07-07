"use strict";

const http = require("http");

const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const person = {
    firstName: "Jane",
    lastName: "Doe",
  };

  res.send(person);
});

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
