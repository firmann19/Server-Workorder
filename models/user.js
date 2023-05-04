'use strict';
const { hashPassword } = require("../helpers/bcrypt");
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Departement, {
        foreignKey: "DepartementId"
      }),
      this.belongsTo(models.Group, {
        foreignKey: "GroupId"
      })      
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    posisi: DataTypes.STRING,
    DepartementId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    roles: DataTypes.STRING,
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