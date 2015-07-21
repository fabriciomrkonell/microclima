'use strict';

var express = require('express'),
		pass = require('../config/pass'),
		router  = express.Router();

router.get('/api*', pass.validAuthenticationJSON, function(req, res, next) {
	next();
});

router.post('/api*', function(req, res, next) {
	next();
});

router.get('/menu', pass.validAuthenticationJSON, function(req, res) {
	res.sendfile('menu/' + req.user.group + '.js');
});

router.get('/users', pass.validAuthenticationPage, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/profile', pass.validAuthenticationPage, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/sensor', pass.validAuthenticationPage, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/maps', pass.validAuthenticationPage, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/station', pass.validAuthenticationPage, function(req, res, next) {
	res.sendfile('views/index.html');
});

module.exports = router;