"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checkout.init(
    {
      UserRequestId: DataTypes.INTEGER,
      namaBarang: DataTypes.STRING,
      kodeBarang: DataTypes.STRING,
      permasalahan: DataTypes.STRING,
      UserApproveId: DataTypes.INTEGER,
      StatusWO: {
        type: DataTypes.STRING,
        defaultValue: "Pending" 
      },
      otp: DataTypes.STRING,
      tindakan: DataTypes.STRING,
      gantiSparepart: DataTypes.STRING,
      UserITid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );
  return Checkout;
};
