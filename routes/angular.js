'use strict';

var express = require('express'),
		router  = express.Router();

router.get('/maps', function(req, res, next) {
  res.sendfile('views/index.html');
});

module.exports = router;