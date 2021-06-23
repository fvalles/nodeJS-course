const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
  res.send([
    {
      name: "Federico",
      age: 30,
    },
    {
      name: "Sarah",
      age: 32,
    },
  ]);
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
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
