'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

router.get('/', function(req, res) {
 	models.SensorData.count().then(function(data) {
    res.send({ error: 0, data: data });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

router.post('/', function(req, res) {
  if(req.body.stationId){
  	if(req.body.data){
  		if(req.body.data.length > 0){
	  		var values = [];
	  		for(var i = 0; i < req.body.data.length; i++){
	  			values.push({ StationId: req.body.stationId, SensorId: req.body.data[i].sensorId, valueData: req.body.data[i].dataValue });
	  		}
	  		models.SensorData.bulkCreate(values).then(function(data) {
		      res.send({ error: 0 });
		    }).catch(function(err) {
		      res.send({ error: 1, message: 'Os valores estão inválidos!' });
		    });
	  	}else{
	  		res.send({ error: 1, message: 'Estação sem valores!' });
	  	}
  	}else{
  		res.send({ error: 1, message: 'Valores não encontrados!' });
  	}
  }else{
  	res.send({ error: 1, message: 'Estação não encontrada!' });
  }
});

module.exports = router;