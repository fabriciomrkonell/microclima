'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    migration.addColumn(
      'Sensors',
      'unit',
      {
        type: DataTypes.STRING,
        defaultValue: 'ºC'
      }
    );
  }
};