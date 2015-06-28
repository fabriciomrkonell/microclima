'use strict';

module.exports = function(sequelize, DataTypes) {

  var Sensor = sequelize.define("Sensor", {
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'A descrição é inválida!' }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Sensor.hasMany(models.StationSensor, { onDelete: 'cascade' });
      }
    }
  });

  return Sensor;
};