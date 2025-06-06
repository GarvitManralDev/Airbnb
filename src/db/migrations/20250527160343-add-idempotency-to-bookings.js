"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("bookings", "idempotencyKey", {
      type: Sequelize.STRING,
      allowNull: false, // or true if optional
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("bookings", "idempotencyKey");
  },
};
