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
      DepartUserId: DataTypes.INTEGER,
      namaBarang: DataTypes.STRING,
      kodeBarang: DataTypes.STRING,
      permasalahan: DataTypes.STRING,
      StatusWO: {
        type: DataTypes.STRING,
        defaultValue: "Belum Approve",
      },
      UserApproveId: DataTypes.INTEGER,
      otp: DataTypes.STRING,
      date_requestWO: DataTypes.DATE,
      tindakan: DataTypes.STRING,
      gantiSparepart: DataTypes.STRING,
      StatusPengerjaan: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
      HeadITid: DataTypes.INTEGER,
      User_IT: DataTypes.STRING,
      date_completionWO: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );
  return Checkout;
};
