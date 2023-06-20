'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChangeSpareparts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userRequestWo: {
        type: Sequelize.STRING
      },
      departementUser: {
        type: Sequelize.STRING
      },
      namaSparepart: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.STRING
      },
      jumlahOrder: {
        type: Sequelize.STRING
      },
      alasan: {
        type: Sequelize.STRING
      },
      statusPengajuan: {
        type: Sequelize.STRING
      },
      HeadIT: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
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
    await queryInterface.dropTable('ChangeSpareparts');
  }
};