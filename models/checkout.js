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
      user: DataTypes.STRING,
      departemen: DataTypes.STRING,
      namaPeralatan: DataTypes.STRING,
      kodePeralatan: DataTypes.STRING,
      permasalahan: DataTypes.STRING,
      statusWO: {
        type: DataTypes.ENUM,
        values: ["verifikasi", "belum verifikasi"],
        defaultValue: "belum verifikasi",
      },
      email: DataTypes.STRING,
      otp: DataTypes.STRING,
      tindakan: DataTypes.STRING,
      infopergantian: DataTypes.STRING,
      pemohon: DataTypes.STRING,
      disetujui: DataTypes.STRING,
      dikerjakan: DataTypes.STRING,
      mengetahui: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );
  return Checkout;
};
