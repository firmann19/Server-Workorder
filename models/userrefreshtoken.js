"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userRefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userRefreshToken.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  userRefreshToken.init(
    {
      refreshToken: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userRefreshToken",
    }
  );
  return userRefreshToken;
};
