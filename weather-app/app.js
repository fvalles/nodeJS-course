const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const addresInput = process.argv[2];

if (addresInput) {
  geocode(addresInput, (geocodeError, geocodeData) => {
    if (geocodeError) {
      return console.log(geocodeError);
    }

    const { latitude, longitude, location } = geocodeData;

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return console.log(forecastError);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
} else {
  console.log("Please provide a valid address name");
}
