'use strict';

module.exports = function(sequelize, DataTypes) {

  var SensorData = sequelize.define("SensorData", {
    valueData: {
      type: DataTypes.STRING,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        SensorData.belongsTo(models.Station);
        SensorData.belongsTo(models.Sensor);
      }
    }
  });

  return SensorData;
};