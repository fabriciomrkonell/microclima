'use strict';

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
      validate: {
        isEmail: { msg: "O e-mail é inválido!" }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 10],
          msg: "A senha deve ter entre 6 e 10 caracteres!"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Group);
      }
    }
  });

  return User;
};