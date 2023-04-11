"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "DepartementId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Users", {
      fields: ["DepartementId"],
      type: "foreign key",
      name: "departement_fk",
      references: {
        table: "Departements",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Users", "departement_fk");
    await queryInterface.removeColumn("Users", "DepartementId");
  },
};
