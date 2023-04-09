'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "GroupId", {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint("Users", {
      fields: ["GroupId"],
      type: "foreign key",
      name: "group_fk",
      references: {
        table: "groups",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint("Users", "group_fk")
     await queryInterface.removeColumn("Users", "GroupId")
  }
};
