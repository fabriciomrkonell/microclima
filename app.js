'use strict';

var express = require('express'),
    database = require('./database/init'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    pass = require('./config/pass');

var routes = require('./routes/index'),
    angular = require('./routes/angular'),
    users = require('./routes/users'),
    sensors = require('./routes/sensors'),
    stations = require('./routes/stations'),
    stationssensors = require('./routes/stationssensors'),
    sensordata = require('./routes/sensordata');

var app = express();

var session = require('express-session')({
  secret: 'microclima',
  resave: false,
  saveUninitialized: false
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session);

pass.initialize(app);

app.use('/', routes);
app.use('/', angular);
app.use('/api/users', users);
app.use('/api/sensors', sensors);
app.use('/api/stations', stations);
app.use('/api/sensordata', sensordata);
app.use('/api/stationssensors', stationssensors);
app.use('/api/sensordata', sensordata);

app.use('/init-database', function(res, req, next){
  database.init(res, req, next);
});

app.use(function(req, res, next) {
  var err = new Error('Não encontrado!');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;