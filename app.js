"use strict";

const http = require("http");

const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const hello = "Hallo Welt!";

  res.send(hello);
});

app.get("/person", (req, res) => {
  const person = {
    firstName: "Jane",
    lastName: "Doe",
  };

  res.send(person);
});

app.get("/people", (req, res) => {
  const people = [
    {
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      firstName: "John",
      lastName: "Done",
    },
    {
      firstName: "James",
      lastName: "Doer",
    },
  ];

  res.send(people);
});

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
