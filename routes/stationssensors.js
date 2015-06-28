'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

router.get('/', function(req, res) {
  var send = {
    stations: [],
    sensors: [],
    stationssensors: []
  };
  models.Station.findAll({
    attributes: ['id', 'description']
  }).then(function(data_stations) {
    send.stations = data_stations;
    models.Sensor.findAll({
      attributes: ['id', 'description'],
    }).then(function(data_sensors) {
      send.sensors = data_sensors;
      models.StationSensor.findAll({
        attributes: ['StationId', 'SensorId']
      }).then(function(data_stationssensors) {
        send.stationssensors = data_stationssensors;
        res.send({ error: 0, data: send });
      }).catch(function(err) {
        error.sendError(res, err);
      });
    }).catch(function(err) {
      error.sendError(res, err);
    });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

router.post('/', function(req, res) {
  models.StationSensor.find({
    attributes: ['id'],
    where: {
      SensorId: req.body.SensorId,
      StationId: req.body.StationId
    }
  }).then(function(entity) {
    if(entity){
      entity.destroy().then(function(){
        res.send({ error: 0, message: 'Deletado com sucesso!' });
      }).catch(function(err) {
        error.sendError(res, err);
      });
    }else{
      models.StationSensor.create(req.body).then(function(){
        res.send({ error: 0, message: 'Salvo com sucesso!' });
      }).catch(function(err) {
        error.sendError(res, err);
      });
    }
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

module.exports = router;