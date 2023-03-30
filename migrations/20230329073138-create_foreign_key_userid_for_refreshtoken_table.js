'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("RefreshTokens", "PenggunaId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("RefreshTokens", {
      fields: ["PenggunaId"],
      type: "foreign key",
      name: "pengguna_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("RefreshTokens", "user_fk")
    await queryInterface.removeColumn("RefreshTokens", "PenggunaId")
  }
};
