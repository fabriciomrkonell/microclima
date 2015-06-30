'use strict';

var express = require('express'),
		pass = require('../config/pass'),
		router  = express.Router();

router.get('/maps', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/group', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/user', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/station', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/sensor', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/stationsensor', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

router.get('/page', pass.validAuthentication, function(req, res, next) {
	res.sendfile('views/index.html');
});

module.exports = router;