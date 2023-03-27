'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laporans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tindakan: {
        type: Sequelize.STRING
      },
      gantiSparepart: {
        type: Sequelize.STRING
      },
      dikerjakan: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      statusLaporan: {
        type: Sequelize.ENUM,
        values: ["diketahui", "belum diketahui"],
        defaultValue: "belum diketahui"
      },
      otp: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Laporans');
  }
};