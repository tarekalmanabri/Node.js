const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 8282;

app.use(express.json());
// https://www.reddit.com/r/node/comments/75ad8w/very_new_to_nodeexpress_help_with_reqbody_empty/
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
  // res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  console.log(req.body);
  // const cityName = req.body.input.name;
  res.send(req.body);
});

app.listen(PORT);
