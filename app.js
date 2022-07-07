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

app.get("/error500", (req, res) => {
  // TODO: Resolve Magic Number to a const
  res.status(500).end();
});

app.get("/blog/:year/:month/:day?", (req, res) => {
  if (req.query.format.data === "html") {
    return res.send(
      `<h1>${req.params.day || "01"}.${req.params.month}.${req.params.year}<h1>`
    );
  }

  res.send({
    year: req.params.year - 0,
    month: req.params.month - 0,
    day: req.params.day || "01" - 0,
  });
});

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
