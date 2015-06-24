'use strict';

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "O e-mail não pode ser vazio!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: "A senha deve ser entre 6 á 10 caracteres!"
        }
      }
    }
  });

  return User;
};