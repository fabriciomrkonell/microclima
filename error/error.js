'use strict';

exports.sendError = function(res, error) {

	var err = { error: 1, message: '' };

	switch(error.name) {
    case 'SequelizeUniqueConstraintError':
    	err.message = 'Já existe um cadastro com esse valor!';
      break;
    case 'SequelizeValidationError':
    	err.message = error.errors[0].message;
      break;
    default:
    	err.message = error.erros[0].message;
      break;
	}

	res.send(err);
};