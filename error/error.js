'use strict';

exports.sendError = function(res, error, msg) {

	var err = { error: 1, message: '' };

  if(error == null){
    err.message = msg;
  }else{
    switch(error.name) {
      case 'SequelizeUniqueConstraintError':
        if(error.errors[0].path == 'email'){
          err.message = 'Já existe um usuário com esse e-mail!';
        }else{
          err.message = 'Já existe um cadastro com esse valor!';
        }
        break;
      default:
        err.message = error.errors[0].message;
        break;
    }
  }

	res.send(err);
};