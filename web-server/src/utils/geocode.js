const request = require("postman-request");

const geocode = (address, callback) => {
  const mapBoxApiKey =
    "pk.eyJ1IjoiZmVkZXZhMzciLCJhIjoiY2twdHlkZXVhMGk0cTJvb2FheW10ZWRjcyJ9.qmFXL1QVoswZZSwb64RC5g";
  const limit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapBoxApiKey}&limit=${limit}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else {
      const {
        body: { features },
      } = response;

      if (features.length === 0) {
        callback(
          "Unable to find location, try again with a different search term",
          undefined
        );
      } else {
        const { center } = features[0];
        const { place_name: location } = features[0];
        const [longitude, latitude] = center;

        callback(undefined, {
          latitude,
          longitude,
          location,
        });
      }
    }
  });
};

module.exports = geocode;
