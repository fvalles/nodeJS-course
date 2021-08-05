const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const weatherStackApiKey = "8919501a3cd453aa16f3f7b2f8669496";
  const coordinates = `${latitude},${longitude}`;
  const units = "m";
  const url = `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${coordinates}&units=${units}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else {
      const { current } = body;
      const errorResponse = body.error;
      if (errorResponse) {
        callback("Unable to find location", undefined);
      } else {
        const { temperature } = current;
        const { feelslike } = current;
        const { humidity } = current;
        const { weather_descriptions } = current;
        callback(
          undefined,
          `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`
        );
      }
    }
  });
};

module.exports = forecast;
