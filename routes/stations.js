'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

router.get('/', function(req, res) {
  models.Station.findAll({
    attributes: ['id', 'description', 'latitude', 'longitude']
  }).then(function(data) {
    res.send({ error: 0, data: data });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

router.post('/', function(req, res) {
  if(req.body.id){
    models.Station.find({
      attributes: ['id', 'description', 'latitude', 'longitude'],
      where: {
        id: req.body.id
      }
    }).then(function(entity) {
      entity.updateAttributes(req.body).then(function(data) {
        res.send({ error: 0, data: data });
      }).catch(function(err) {
        error.sendError(res, err);
      });
    }).catch(function(err) {
      error.sendError(res, err);
    });
  }else{
    models.Station.create(req.body).then(function(data) {
      res.send({ error: 0, data: data });
    }).catch(function(err) {
      error.sendError(res, err);
    });
  }
});

router.delete('/:id', function(req, res) {
  models.Station.find({
    attributes: ['id'],
    where: {
      id: req.param('id')
    }
  }).then(function(entity) {
    entity.destroy().then(function(data) {
      res.send({ error: 0, data: data });
    }).catch(function(err) {
      error.sendError(res, err);
    });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

module.exports = router;