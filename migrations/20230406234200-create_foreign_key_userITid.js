'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "UserITid", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Checkouts", {
      fields: ["UserITid"],
      type: "foreign key",
      name: "userIT_fk",
      references: {
        table: "users",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint("Users", "userIT_fk")
     await queryInterface.removeColumn("Users", "UserITid")
  }
};
