'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models'),
    config = require('../config/pages.json'),
    passwordHash = require('password-hash');

function security() { };

function getUrl(param, flag){
  var lenghtParam = param.length;
  if(parseInt(param[lenghtParam - 1])){
    param = param.substr(lenghtParam * -1, lenghtParam - 1);
    return getUrl(param, true);
  }else{
    if(flag){
      return param = param.substr(lenghtParam * -1, lenghtParam - 1);
    }else{
      return param;
    }
  }
}

function validAuthenticationPage(req, res, next){
  if(req.user){
    if(config[req.user.group].page.indexOf(getUrl(req._parsedOriginalUrl.path)) != '-1'){
      next();
    }else{
      res.redirect('/logout');
    }
  }else{
    res.redirect('/logout');
  }
};

function validAuthenticationJSON(req, res, next){
  if(req.user){
    if(config[req.user.group].api.indexOf(getUrl(req._parsedOriginalUrl.path)) != '-1'){
      next();
    }else{
      res.send({ error: 2, message: 'Usuário sem permissão de acesso!' });
    }
  }else{
    if(getUrl(req._parsedOriginalUrl.path) == '/api/sensordata/station'){
      next();
    }else{
      res.send({ error: 2, message: 'Usuário sem permissão de acesso!' });
    }
  }
};

function validAuthenticationPostJSON(req, res, next){
  if(req.user){
    if(config[req.user.group].api.indexOf(getUrl(req._parsedOriginalUrl.path)) != '-1'){
      next();
    }else{
      res.send({ error: 2, message: 'Usuário sem permissão de acesso!' });
    }
  }else{
    if(getUrl(req._parsedOriginalUrl.path) == '/api/sensordata/data'){
      next();
    }else{
      res.send({ error: 2, message: 'Usuário sem permissão de acesso!' });
    }
  }
};

security.prototype.validAuthenticationPage = function(req, res, next) {
  validAuthenticationPage(req, res, next);
};

security.prototype.validAuthenticationJSON = function(req, res, next) {
  validAuthenticationJSON(req, res, next);
};

security.prototype.validAuthenticationPostJSON = function(req, res, next) {
  validAuthenticationPostJSON(req, res, next);
};

security.prototype.findUser = function(username, password, done) {
  models.User.find({
    where: { email: username },
    attributes: ['id', 'fullname', 'email', 'password', 'group']
  }).then(function(entity) {
    if(entity){
      if(passwordHash.verify(password, entity.password)){
        done(null, entity);
      }else{
        done(null, null);
      }
    }else{
      done(null, null);
    }
  });
};

security.prototype.initialize = function(express) {

  this.app = express;
  this.app.use(passport.initialize());
  this.app.use(passport.session());

  passport.use(new LocalStrategy(this.findUser));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  this.app.post('/login', passport.authenticate('local'), function(req, res, next){
    if(req.user){
      res.send({ error: 0, message: 'Usuário autenticado com sucesso!' });
    }else{
      res.send({ error: 1, message: 'Email ou senhas inválidos!' });
    }
  });

  this.app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

};

module.exports = new security();