'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

exports.init = function(req, res, next) {

	if(req.param('token') == 'microclima'){
		models.User.findAll().then(function(data){
			if(data.length > 0){
				res.send({ error: 1, message: 'Já existe um usuário cadastrado!'});
			}else{
				models.User.create({
					fullname: 'Sensul',
					email: 'sensul@sensul.com',
					password: 'sensul',
					group: 1
				});
				res.send({ error: 0, message: 'Inicialização completa!'});
			}
		});
	}else{
		res.send({ error: 1, message: 'Inicialização inválida!'});
	}
};