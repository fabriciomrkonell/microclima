'use strict';

module.exports = function(sequelize, DataTypes) {

  var Station = sequelize.define("Station", {
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'A descrição é inválida!' }
      }
    },
    latitude: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      validate: {
        max: { args: 90, msg: 'A latitude é inválida!' },
        min: { args: -90, msg: 'A latitude é inválida!' }
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      validate: {
        max: { args: 180, msg: 'A longitude é inválida!' },
        min: { args: -180, msg: 'A longitude é inválida!' }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Station.hasMany(models.StationSensor, { onDelete: 'cascade' });
      }
    }
  });

  return Station;
};