const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const { response } = require("express");
const API_KEY = require("./sources/keys.json").API_KEY;

const app = express();

const PORT = process.env.PORT || 8282;

app.use(express.json());
// https://www.reddit.com/r/node/comments/75ad8w/very_new_to_nodeexpress_help_with_reqbody_empty/
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  let result;
  const cityName = req.body.cityName;
  try {
    result = await axios.post(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`
    );
    res.render("index", {
      weatherText: `The temperature in ${cityName} is ${result.data.main.temp}`,
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
    res.render("index", { weatherText: "City is not found!" });
    return;
  }
});

app.listen(PORT);
