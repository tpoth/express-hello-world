"use strict";

const http = require("http"),
  path = require("path");

const bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  express = require("express");

const logger = require("./logger");

const app = express();
const port = 3000;

app.use(cors());

app.use(
  bodyParser.json({
    limit: "100kb",
    strict: true,
  })
);

app.use(cookieParser("secret"));

app.use(logger({ level: "debug" }));

const clientDirectory = path.join(__dirname, "client");

app.use("/", express.static(clientDirectory));

app.get("/hello", (req, res) => {
  res
    .cookie("user", "jane doe", {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
      signed: false,
    })
    .send("Hallo, Welt!");
});

app.get("/person", (req, res) => {
  const user = req.cookies.user;
  const userSIgned = req.signedCookies.user;

  console.log(`Cookie of user: ${user}`);
  console.log(`Signed cookie of user: ${userSIgned}`);

  const person = {
    firstName: "Jane",
    lastName: "Doe",
  };

  res.send(person);
});

app.post("/person", (req, res) => {
  res.send(`Hallo ${req.body.firstName}!`);
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
  if (req.query.format === "html") {
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
  console.log(`Example app listens on port ${port}`);
});
