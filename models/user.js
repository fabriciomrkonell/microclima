'use strict';

var passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    fullname: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'O nome é inválido!' }
      }
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: true,
      validate: {
        isEmail: { msg: "O e-mail é inválido!" }
      }
    },
    password: {
      type: DataTypes.STRING,
      set: function(password) {
        this.setDataValue('password', passwordHash.generate(password));
      }
    },
    group: {
      type: DataTypes.INTEGER,
      // 1 = Administrador
      // 2 = Cliente
      defaultValue: 1
    }
  });

  return User;
};