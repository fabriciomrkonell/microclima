'use strict';

var models  = require('../models'),
    express = require('express'),
    error = require('../error/error'),
    router  = express.Router();

function getHours(date){
  console.log(date);
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
    limit: 10,
    where: req.body.data,
    attributes: ['valueData', [models.sequelize.fn('date_format', models.sequelize.col('createdAt'), '%Y-%m-%d %H:%i'), 'dateCreate']],
    order: 'createdAt DESC'
  }).then(function(data) {
    res.send({ error: 0, data: data.reverse() });
  }).catch(function(err) {
    error.sendError(res, err);
  });
});

module.exports = router;