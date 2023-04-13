'use strict';
const { hashPassword } = require("../helpers/bcrypt");
const {Model} = require('sequelize');
const {Checkout} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
     
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    posisi: DataTypes.STRING,
    roles: {
      type: DataTypes.ENUM,
      values: ["admin", "user"]
    },
    DepartementId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashPassword(user.password);
      },
    },
   
  });
  return User;
};