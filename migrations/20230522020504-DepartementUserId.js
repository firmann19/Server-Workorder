"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "DepartUserId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Checkouts", {
      fields: ["DepartUserId"],
      type: "foreign key",
      name: "DepartUser_fk",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Checkouts", "DepartUser_fk");
    await queryInterface.removeColumn("Checkouts", "DepartUserId");
  },
};
