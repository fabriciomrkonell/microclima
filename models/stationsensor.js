'use strict';

module.exports = function(sequelize, DataTypes) {

  var StationSensor = sequelize.define("StationSensor", {
  }, {
    classMethods: {
      associate: function(models) {
        StationSensor.belongsTo(models.Station);
        StationSensor.belongsTo(models.Sensor);
      }
    }
  });

  return StationSensor;
};