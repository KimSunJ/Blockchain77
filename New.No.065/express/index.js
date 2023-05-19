const path = require("path");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/index.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.css"));
});

app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.js"));
});

app.get("/board", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.js"));
});

app.get("/board/list", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.js"));
});

app.listen(4193, () => {
  console.log("4193 server open");
});
