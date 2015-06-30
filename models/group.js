'use strict';

module.exports = function(sequelize, DataTypes) {

  var Group = sequelize.define("Group", {
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
        Group.hasMany(models.User, { onDelete: 'cascade' })
      }
    }
  });

  return Group;
};