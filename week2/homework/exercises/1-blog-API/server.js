const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { title } = require("process");
// YOUR CODE GOES IN HERE
app.use(express.json());

function getFilePath(fileName = "") {
  return path.join(__dirname, "blogs", fileName);
}

app.post("/blogs", (req, res) => {
  fs.writeFileSync(getFilePath(req.body.title), req.body.content);
  res.end("ok");
});

app.put("/blogs/:title", (req, res) => {
  const filePath = getFilePath(req.params.title);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, req.body.content);
    res.end("ok");
  } else {
    throw new Error("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const filePath = getFilePath(req.params.title);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.end("ok");
  } else {
    throw new Error("This post does not exist!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const filePath = getFilePath(req.params.title);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    res.send(fileContent);
  } else {
    throw new Error("This post does not exist!");
  }
});

app.get("/blogs", (req, res) => {
  let files;

  try {
    files = fs.readdirSync(getFilePath());
  } catch (err) {
    return console.log("Unable to scan directory: " + err);
  }
  const response = [];

  files.forEach(function (file) {
    response.push({ title: file });
  });

  res.send(response);
});

app.listen(3000);
