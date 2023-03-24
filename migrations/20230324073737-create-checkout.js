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
      user: {
        type: Sequelize.STRING
      },
      departemen: {
        type: Sequelize.STRING
      },
      namaPeralatan: {
        type: Sequelize.STRING
      },
      kodePeralatan: {
        type: Sequelize.STRING
      },
      permasalahan: {
        type: Sequelize.STRING
      },
      statusWO: {
        type: Sequelize.ENUM,
        values: ['verifikasi', 'belum verifikasi'],
        defaultValue: 'belum verifikasi'
      },
      email: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      tindakan: {
        type: Sequelize.STRING
      },
      infopergantian: {
        type: Sequelize.STRING
      },
      pemohon: {
        type: Sequelize.STRING
      },
      disetujui: {
        type: Sequelize.STRING
      },
      dikerjakan: {
        type: Sequelize.STRING
      },
      mengetahui: {
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