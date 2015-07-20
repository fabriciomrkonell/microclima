'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

router.get('/:id', function(req, res) {
  models.StationSensor.findAll({
    where: {
      StationId: req.param('id')
    },
    attributes: ['SensorId']
  }).then(function(entities) {
    res.send({ error: 0, data: entities });
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