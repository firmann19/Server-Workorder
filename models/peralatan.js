'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peralatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Peralatan.init({
    namaPeralatan: DataTypes.STRING,
    kodePeralatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Peralatan',
  });
  return Peralatan;
};