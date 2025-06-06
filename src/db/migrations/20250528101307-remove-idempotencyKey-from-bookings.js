"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the 'idempotencyKey' column from 'bookings' table
    await queryInterface.removeColumn("bookings", "idempotencyKey");
  },

  async down(queryInterface, Sequelize) {
    // Add the 'idempotencyKey' column back in case of rollback
    await queryInterface.addColumn("bookings", "idempotencyKey", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
