// import express from "express"; // ES2015 modules
const express = require("express"); // commonJS modules, similar to above
const shortid = require("shortid");
const e = require("express");

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
  } else if (req.body.name || req.body.bio) {
    const user = req.body;

    users.push(user);

    res.status(201).json({ data: users });
  } else {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

server.get("/api/users", (req, res) => {
  if (req.body) {
    res.status(200).json({ data: users });
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  let found = users.find((u) => u.id === id);

  if (found) {
    res.status(200).json(found);
  } else if (!found) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  let found = users.find((u) => u.id === id);

  if (found) {
    users = users.filter((user) => user.id !== id);

    res.status(200).json(users);
  } else if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/api/users/:id", (req, res) => {
  const changes = req.body;
  const id = Number(req.params.id);
  let found = users.find((u) => u.id === id);

  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else if (found) {
    Object.assign(found, changes);

    res.status(200).json(found);
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  }
});

const port = 8000;
server.listen(port, () => console.log("server listening on port: 8000"));
