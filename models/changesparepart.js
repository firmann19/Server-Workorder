'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChangeSparepart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChangeSparepart.init({
    userRequestWo: DataTypes.STRING,
    departementUser: DataTypes.STRING,
    namaSparepart: DataTypes.STRING,
    harga: DataTypes.STRING,
    jumlahOrder: DataTypes.STRING,
    alasan: DataTypes.STRING,
    statusPengajuan: {
      type: DataTypes.STRING,
      values: ["Belum Diketahui", "Ditolak", "Diterima"],
      defaultValue: "Belum Diketahui" 
    },
    HeadIT: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChangeSparepart',
  });
  return ChangeSparepart;
};