'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    migration.removeColumn(
      'Sensors',
      'teste',
      {
        type: DataTypes.STRING,
        defaultValue: 'ºC'
      }
    );
  }
};