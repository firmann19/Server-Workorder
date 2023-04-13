"use strict";
const { Model } = require("sequelize");
const { User } = require("../models");
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Checkout.init(
    {
      permasalahan: DataTypes.STRING,
      tindakan: DataTypes.STRING,
      gantisparepart: DataTypes.STRING,
      otp: DataTypes.STRING,
      verifikasi: {
        type: DataTypes.ENUM,
        values: ["belum verifikasi", "sudah verifikasi"],
        defaultValue: "belum verifikasi"
      },
      userApproveId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      userRequestId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      userITid: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      peralatanId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Peralatans",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );
  return Checkout;
};
