"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "HeadITid", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Checkouts", {
      fields: ["HeadITid"],
      type: "foreign key",
      name: "HeadIT_fk",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Checkouts", "HeadIT_fk");
    await queryInterface.removeColumn("Checkouts", "HeadITid");
  },
};
