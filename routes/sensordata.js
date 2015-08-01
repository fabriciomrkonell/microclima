'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

function getHours(date){
  var d = new Date(date);
  d.setHours(d.getHours() + 3)
  return d;
};

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
          console.log('Salvo com sucesso!');
		    }).catch(function(err) {
          console.log('Os valores estão inválidos!');
		      res.send({ error: 1, message: 'Os valores estão inválidos!' });
		    });
	  	}else{
        console.log('Estação sem valores!');
	  		res.send({ error: 1, message: 'Estação sem valores!' });
	  	}
  	}else{
      console.log('Valores não encontrados!');
  		res.send({ error: 1, message: 'Valores não encontrados!' });
  	}
  }else{
    console.log('Estação não encontrada!');
  	res.send({ error: 1, message: 'Estação não encontrada!' });
  }
});

router.post('/data', function(req, res) {
  if(req.body.daterange){
    req.body.data.createdAt = {
      between: [ getHours(req.body.daterange.startDate), getHours(req.body.daterange.endDate) ]
    }
  }
  models.SensorData.findAll({
    where: req.body.data,
    attributes: ['valueData', [models.sequelize.fn('date_format', models.sequelize.col('createdAt'), '%Y-%m-%d %H:%i'), 'dateCreate']],
    order: 'createdAt DESC'
  }).then(function(data) {
    res.send({ error: 0, data: data.reverse() });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

router.get('/station/:idStation', function(req, res) {
  models.SensorData.findAll({
    attributes: ['sensorId', 'valueData'],
    limit: 50,
    order: 'SensorData.id DESC',
    where: {
      StationId: req.param('idStation')
    },
    include: [{
      model: models.Sensor,
      attributes: ['description', 'unit']
    }]
  }).then(function(data) {
    var array = [],
        response = [];
    for(var i = 0; i < data.length; i++){
      if(array.indexOf(data[i].dataValues.sensorId) == '-1'){
        response.push(data[i]);
        array.push(data[i].dataValues.sensorId);
      }
    };
    res.send({ error: 0, data: response });
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;