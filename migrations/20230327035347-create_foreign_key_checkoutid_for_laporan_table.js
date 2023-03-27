'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Laporans", "CheckoutId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Laporans", {
      fields: ["CheckoutId"],
      type: "foreign key",
      name: "checkout_fk",
      references: {
        table: "Checkouts",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Laporans", "checkout_fk")
    await queryInterface.removeColumn("Laporans", "CheckoutId")
  }
};
