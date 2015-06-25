'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

exports.init = function(req, res, next) {
  models.User.create({ fullname: 'Fabrício', email: 'fabricio@gmail.com', password: 'admin1234' }).then(function(data, error){
  }).catch(function(err) {
   	error.sendError(res, err);
 	});
};