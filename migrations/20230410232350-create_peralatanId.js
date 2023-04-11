"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "peralatanId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Checkouts", {
      fields: ["peralatanId"],
      type: "foreign key",
      name: "peralatan_fk",
      references: {
        table: "Peralatans",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Checkouts", "peralatan_fk");
    await queryInterface.removeColumn("Checkouts", "peralatanId");
  },
};
