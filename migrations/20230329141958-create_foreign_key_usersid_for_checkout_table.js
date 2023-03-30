'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkouts", "UserId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Checkouts", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Checkouts", "user_fk")
    await queryInterface.removeColumn("Checkouts", "UserId")
  }
};
