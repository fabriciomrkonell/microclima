'use strict';

var models = require('../models'),
		express = require('express'),
		router  = express.Router();

router.get('/', function(req, res, next) {
  if(req.user){
    res.sendfile('views/home.html');
  }else{
    res.sendfile('views/login.html');
  }
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