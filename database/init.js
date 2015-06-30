'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

exports.init = function(req, res, next) {

	if(req.param('init') == 'microclima'){
		models.User.findAll().then(function(data){
			if(data.length > 0){
				res.send({ error: 1, message: 'Já existe um usuário cadastrado!'});
			}else{
				models.Group.create({ description: 'Normal' }).then(function(entity){
					models.User.create({ fullname: 'Fabrício', email: 'fabricioronchii@gmail.com', password: 'admin1234', GroupId: entity.id });
					res.send({ error: 0, message: 'Inicialização completa!'});
				});
			}
		});
	}else{
		res.send({ error: 1, message: 'Inicialização inválida!'});
	}
};