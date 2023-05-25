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
      UserRequestId: {
       type: Sequelize.INTEGER,
      },
      DepartUserId: {
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
      StatusWO: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      UserApproveId: {
        type: Sequelize.INTEGER,
       },
      date_requestWO: {
        type: Sequelize.DATE
      },
      tindakan: {
        type: Sequelize.STRING
      },
      gantiSparepart: {
        type: Sequelize.STRING
      },
      StatusPengerjaan: {
        type: Sequelize.STRING
      },
      User_IT: {
        type: Sequelize.STRING
      },
      HeadITId: {
        type: Sequelize.INTEGER,
       },
      date_completionWO: {
        type: Sequelize.DATE
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