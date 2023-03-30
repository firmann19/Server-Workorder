'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
    }
  }
  Checkout.init({
    UserId: DataTypes.INTEGER,
    namaPeralatan: DataTypes.STRING,
    kodePeralatan: DataTypes.STRING,
    permasalahan: DataTypes.STRING,
    statusWO: {
      type: DataTypes.ENUM,
      values: ["disetujui", "belum disetujui"],
      defaultValue: "belum disetujui"
        }, 
    email: DataTypes.STRING,
    otp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};