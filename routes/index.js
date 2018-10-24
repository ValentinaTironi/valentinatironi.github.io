require('dotenv').config()
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  res.render('index');
  by_city_name('montevideo');
});

function by_city_name(city_name) {
  city_name = capitalize_first_letter(city_name);
  request(`http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.APPID}`, function (error, response, body) {
    console.log(body);    
  });
}


function capitalize_first_letter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router;
