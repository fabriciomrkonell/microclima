'use strict';

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Name must be atleast 3 characters in length"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      notNull: true
    }
  });

  return User;
};