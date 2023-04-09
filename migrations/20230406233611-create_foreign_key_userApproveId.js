'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "UserApproveId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Checkouts", {
      fields: ["UserApproveId"],
      type: "foreign key",
      name: "userApprove_fk",
      references: {
        table: "users",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint("Users", "userApprove_fk")
     await queryInterface.removeColumn("Users", "UserApproveId")
  }
};
