const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

const authorName = "Fede Valles";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: authorName,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: authorName,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: authorName,
    helpText: "This is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It's cloudy and it's 10 degrees",
    location: "Buenos Aires",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    errorMsg: "Help article not found",
    name: authorName,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: authorName,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log("Server is up on port", port);
});
