'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.find({ id: id }).success(function(entity) {
    done(null, entity);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  models.User.find({ username: username, password: password }).success(function(entity) {
    if (entity) {
      done(null, entity);
    }else{
      done(null, null);
    }
  });
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
};

exports.ensureAdmin = function ensureAdmin(req, res, next) {
  console.log(req.user);
  if(req.user && req.user.admin === true){
    next();
  }else{
    res.send(403);
  }
}