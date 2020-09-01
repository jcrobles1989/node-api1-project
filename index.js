// import express from "express"; // ES2015 modules
const express = require("express"); // commonJS modules, similar to above
const shortid = require("shortid");

const server = express();

// teaches express how to read JSON from req.body
server.use(express.json()); // needed for the POST and PUT

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's wife, another Jane",
  },
];

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const user = req.body;

    users.push(user);

    res.status(201).json({ data: users });
  }
});

server.get("/api/users", (req, res) => {});

server.get("/api/users/:id", (req, res) => {
  res.status(200).json({ data: users });
});

server.delete("/api/users/:id", (req, res) => {});

server.put("/api/users/:id", (req, res) => {});

const port = 8000;
server.listen(port, () => console.log("server listening on port: 8000"));
