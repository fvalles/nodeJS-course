const path = require("path");
const express = require("express");

const app = express();
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));
app.set("view engine", "hbs");

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Fede Valles",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Fede Valles",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    subtitle: "Do you have any questions? Ask them here! :)",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It's cloudy and it's 10 degrees",
    location: "Buenos Aires",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log("Server is up on port", port);
});
