"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "UserRequestId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Checkouts", {
      fields: ["UserRequestId"],
      type: "foreign key",
      name: "userRequest_fk",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Checkouts", "userRequest_fk");
    await queryInterface.removeColumn("Checkouts", "UserRequestId");
  },
};
