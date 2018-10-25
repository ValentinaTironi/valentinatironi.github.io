require('dotenv').config()
var express = require('express');
var router = express.Router();
var request = require('request');

var data;
var last_option;

router.get('/', function(req, res, next) {
  res.render('index', {
    data: data
  });
});

router.post('/city_name', function(req, res, next) {
  last_option = 'city_name';
  var city_name = req.body.city_name;
  city_name = capitalize_first_letter(city_name);

  request(`http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.APPID}`, function (request, response, body) {
    if (body) {   
      data = get_data(body)
      res.redirect('/');
    } else { 
      res.render('error', {
        message: 'Sorry',
        error: error
      }); 
    }
  });
});

router.post('/city_id', function(req, res, next) {
  last_option = 'city_id';
  var city_id = req.body.city_id;
  city_id = capitalize_first_letter(city_id);

  request(`http://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${process.env.APPID}`, function (request, response, body) {
    if (body) {   
      data = get_data(body)
      res.redirect('/');
    } else { 
      res.render('error', {
        message: 'Sorry',
        error: error
      }); 
    }
  });
});

router.post('/geographic_coordinates', function(req, res, next) {
  last_option = 'geographic_coordinates';
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;

  request(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.APPID}`, function (request, response, body) {
    if (body) {   
      data = get_data_coordinates(body)
      res.redirect('/');
    } else { 
      res.render('error', {
        message: 'Sorry',
        error: error
      }); 
    }
  });
})
function capitalize_first_letter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function get_data(body) {
  body = JSON.parse(body);
  var data = {};
  data.main = body.main;  
  data.visibility = body.visibility;
  data.wind = body.wind;
  return data;
}

function get_data_coordinates(body) {
  body = JSON.parse(body);
  var data = get_data(body);
  data.rain = body.rain;
  data.name = body.name;
  return data;
}
module.exports = router;
