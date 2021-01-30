const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//settting static dir to serve
app.use(express.static(publicDirectoryPath));

// setting handler bars and views locations
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Yannick Nahimana",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Yannick Nahimana",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "hello,this is an example of a message",
    title: "help message",
    name: "Yannick Nahimana",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error,
            });
          }
          res.send({
            location,
            address: req.query.address,
            forecast: forecastData,
          });
        });
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help page error",
    name: "Yannick Nahimana",
    errorMessage: "article Not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Yannick Nahimana",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
