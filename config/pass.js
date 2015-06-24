'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models');

function security() { };

function validAuthentication(req, res, next){
  if(res.isAuthenticated()) {
    next();
  }else{
    res.redirect('/');
  }
};

security.prototype.validAuthentication = function(req, res, next) {
  validAuthentication(req, res, next);
};

security.prototype.findUser = function(username, password, done) {
  models.User.find({ where: { email: username, password: password } }).then(function(entity) {
    done(null, entity);
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