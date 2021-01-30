const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5e5a24a7a2ce8f27eedaaf20a065d61b&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";
  request({ url, json: true }, (error, { body } ={}) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("no valid location was found", undefined);
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelTemperature: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
