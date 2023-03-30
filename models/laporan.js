'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Checkout)
    }
  }
  Laporan.init({
    CheckoutId: DataTypes.INTEGER,
    tindakan: DataTypes.STRING,
    gantiSparepart: DataTypes.STRING,
    dikerjakan: DataTypes.STRING,
    email: DataTypes.STRING,
    statusLaporan: {
      type: DataTypes.ENUM,
      values: ["diketahui", "belum diketahui"],
      defaultValue: "belum diketahui"
    }, 
    otp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Laporan',
  });
  return Laporan;
};