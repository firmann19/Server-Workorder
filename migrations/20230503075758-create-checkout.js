'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaBarang: {
        type: Sequelize.STRING
      },
      kodeBarang: {
        type: Sequelize.STRING
      },
      permasalahan: {
        type: Sequelize.STRING
      },
      tindakan: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      gantiSparepart: {
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
    await queryInterface.dropTable('Checkouts');
  }
};