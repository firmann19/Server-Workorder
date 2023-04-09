'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "PeralatanId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Checkouts", {
      fields: ["PeralatanId"],
      type: "foreign key",
      name: "peralatan_fk",
      references: {
        table: "peralatans",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint("Users", "peralatan_fk")
     await queryInterface.removeColumn("Users", "PeralatanId")
  }
};
