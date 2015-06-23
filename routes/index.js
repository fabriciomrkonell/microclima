'use strict';

var models = require('../models'),
		express = require('express'),
    passport = require('passport'),
		router  = express.Router();

router.get('/', function(req, res) {
  res.sendfile('views/login.html');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.send({ error: true });
    }else{
      res.send({ error: false });
    }
  })(req, res, next);
});

router.get('/register', function(req, res) {
});

router.post('/register', function(req, res) {
});

router.get('/recover-password', function(req, res) {
});

router.post('/recover-password', function(req, res) {
});

module.exports = router;