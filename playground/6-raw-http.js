const http = require("http");
const url =
  "http://api.weatherstack.com/current?access_key=8919501a3cd453aa16f3f7b2f8669496&query=-34.59972,-58.38194&units=m";

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
