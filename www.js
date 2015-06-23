'use strict';

var app = require('./app'),
		models = require("./models");

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'));
});