const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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
  if (!req.query.address) {
    return res.send({ error: "You must provide an address term" });
  }

  geocode(
    req.query.address,
    (geocodeError, { latitude, longitude, location }) => {
      if (geocodeError) {
        return res.send({ error: geocodeError });
      }

      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          return res.send({ error: forecastError });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }

  console.log(req.query);
  res.send({
    products: [],
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
