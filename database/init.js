'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

exports.init = function(req, res, next) {
  models.User.create({ fullname: 'Fabrício', email: 'fabricio@gmail.com', password: 'admin1234' });

 	models.Station.create({ latitude: 89.98, longitude: 97});

 	models.Station.findAll().then(function(data){
 		res.send(data);
 	})
};