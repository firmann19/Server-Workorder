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
      UserRequestId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      DepartUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Departements",
          key: "id",
        },
      },
      namaBarang: {
        type: Sequelize.STRING,
      },
      kodeBarang: {
        type: Sequelize.STRING,
      },
      permasalahan: {
        type: Sequelize.STRING,
      },
      StatusWO: {
        type: Sequelize.STRING,
      },
      otp: {
        type: Sequelize.STRING,
      },
      UserApproveId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      date_requestWO: {
        type: Sequelize.DATE,
      },
      tindakan: {
        type: Sequelize.STRING,
      },
      gantiSparepart: {
        type: Sequelize.STRING,
      },
      StatusPengerjaan: {
        type: Sequelize.STRING,
      },
      User_IT: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      HeadITId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      date_completionWO: {
        type: Sequelize.DATE,
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
