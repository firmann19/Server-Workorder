"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Checkouts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      permasalahan: {
        type: Sequelize.STRING,
      },
      tindakan: {
        type: Sequelize.STRING,
      },
      gantisparepart: {
        type: Sequelize.STRING,
      },
      otp: {
        type: Sequelize.STRING,
      },
      verifikasi: {
        type: Sequelize.ENUM,
        values: ["belum verifikasi", "sudah verifikasi"],
        defaultValue: "belum verifikasi",
      },
      userApproveId: {
        type: Sequelize.INTEGER,
      },
      userRequestId: {
        type: Sequelize.INTEGER,
      },
      userITid: {
        type: Sequelize.INTEGER,
      },
      peralatanId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Checkouts");
  },
};
