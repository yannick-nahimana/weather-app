const request = require("request");

const geocode = (address, callback) => {
  url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoieWFubmljazc5MCIsImEiOiJja2tlczE1ZWIwZnJwMnVxdDZyenhiaGp4In0.rosfKxCxkLcUkwqRGkIIkA&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.features.length == 0) {
      callback("cannot find the location you are look for ", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
