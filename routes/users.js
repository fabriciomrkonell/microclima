'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router(),
    passwordHash = require('password-hash');

router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['id', 'fullname', 'email', 'group']
  }).then(function(data) {
    res.send({ error: 0, data: data });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

router.post('/', function(req, res) {
  if(req.body.id){
    models.User.find({
      attributes: ['id', 'fullname', 'email', 'group'],
      where: {
        id: req.body.id
      }
    }).then(function(entity) {
      if(entity){
        delete req.body.group;
        entity.updateAttributes(req.body).then(function(data) {
          res.send({ error: 0, message: 'Usuário atualizado com sucesso!' });
        }).catch(function(err) {
          error.sendError(res, err);
        });
      }else{
        error.sendError(res, null, 'Usuário não encontrado!');
      }
    }).catch(function(err) {
      error.sendError(res, err);
    });
  }else{
    if(req.body.password.length > 4 && req.body.password.length < 15){
      models.User.create(req.body).then(function(data) {
        res.send({ error: 0, data: data });
      }).catch(function(err) {
        error.sendError(res, err);
      });
    }else{
      error.sendError(res, null, 'A senha deve conter entre 4 á 15 caracteres!');
    }
  }
});

router.get('/profile', function(req, res) {
  models.User.find({
    attributes: ['id', 'fullname', 'email', 'group'],
    where: {
      id: req.user.id
    }
  }).then(function(entity) {
    res.send({ error: 0, data: entity });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

router.post('/password', function(req, res) {
  models.User.find({
    attributes: ['id', 'password'],
    where: {
      id: req.user.id
    }
  }).then(function(entity) {
    if(passwordHash.verify(req.body.lastPassword, entity.password)){
      if(req.body.newPassword.length > 4 && req.body.newPassword.length < 15){
        entity.updateAttributes({ password: req.body.newPassword }).then(function(data) {
          res.send({ error: 0, message: 'Senha atualizada com sucesso!' });
        }).catch(function(err) {
          error.sendError(res, err);
        });
      }else{
        error.sendError(res, null, 'A senha deve conter entre 4 á 15 caracteres!');
      }
    }else{
      error.sendError(res, null, 'A senha atual é inválida!');
    }
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

module.exports = router;