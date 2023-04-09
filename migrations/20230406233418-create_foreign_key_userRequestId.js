'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "UserRequestId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Checkouts", {
      fields: ["UserRequestId"],
      type: "foreign key",
      name: "user_fk",
      references: {
        table: "users",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint("Users", "user_fk")
     await queryInterface.removeColumn("Users", "UserRequestId")
  }
};
