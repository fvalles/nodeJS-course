const path = require("path");
const express = require("express");

const app = express();
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

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
