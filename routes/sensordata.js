'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

router.post('/', function(req, res) {
	console.log(req.body);
  if(req.body.stationId){
  	if(req.body.data.length > 0){
  		var values = [];
  		for(var i = 0; i < req.body.data.length; i++){
  			values.push({ StationId: req.body.stationId, SensorId: req.body.data[i].sensorId, valueData: req.body.data[i].valueData });
  		}
  		models.Sensor.bulkCreate(values).then(function(data) {
	      res.send({ error: 0 });
	    }).catch(function(err) {
	      res.send({ error: 1 });
	    });
  	}else{
  		res.send({ error: 1 });
  	}
  }else{
  	res.send({ error: 1, message: 'Estação não encontrada!' });
  }
});

module.exports = router;