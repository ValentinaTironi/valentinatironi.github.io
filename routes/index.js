require('dotenv').config()
var express = require('express');
var router = express.Router();
var request = require('request');

var data;

router.get('/', function(req, res, next) {
  res.render('index', {
    data: data
  });
});

router.post('/city_name', function(req, res, next) {
  var city_name = req.body.city_name;
  city_name = capitalize_first_letter(city_name);
  request(`http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.APPID}`, function (request, response, body) {
    if (body) {         
      data = get_data(body)      
      res.redirect('/');
    } else { 
      res.render('error.jade', {
        message: 'An error was ocurred. Please, try again',
        error: error
      }); 
    }
  });
});

router.post('/city_id', function(req, res, next) {
  var city_id = req.body.city_id;
  city_id = capitalize_first_letter(city_id);

  request(`http://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${process.env.APPID}`, function (request, response, body) {
    if (body) {   
      data = get_data(body)
      res.redirect('/');
    } else { 
      res.render('error.jade', {
        message: 'An error was ocurred. Please, try again',
        error: error
      }); 
    }
  });
});

router.post('/geographic_coordinates', function(req, res, next) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;

  request(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.APPID}`, function (request, response, body) {
    if (body) {         
      data = get_data(body)      
      res.redirect('/');
    } else { 
      res.render('error', {
        message: 'An error was ocurred. Please, try again',
        error: error
      }); 
    }
  });
})

router.post('/zip_code', function(req, res, next) {
  var zip_code = req.body.zip_code;
  zip_code = capitalize_first_letter(zip_code);

  var consulta = `http://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${process.env.APPID}`  
  request(consulta, function (request, response, body) {
    if (body) {   
      data = get_data(body)
      res.redirect('/');
    } else { 
      res.render('error', {
        message: 'An error was ocurred. Please, try again',
        error: error
      }); 
    }
  });
});

router.post('/current_location', function(req, res, next) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  
  if (latitude && longitude) {    
    request(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.APPID}`, function (request, response, body) {
      if (body) {         
        data = get_data(body)      
        res.redirect('/');
      } else { 
        res.render('error', {
          message: 'An error was ocurred. Please, try again',
          error: false
        }); 
      }
    });
  } else {
    res.render('error', {
      message: 'Impossible access to your current location. Please, try writing your city name',
      error: false
    });
  }
});

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

module.exports = router;
