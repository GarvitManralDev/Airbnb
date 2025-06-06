"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create idempotency_keys table
    await queryInterface.createTable("idempotency_keys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 2. Add foreign key column idempotencyKeyId to bookings table
    await queryInterface.addColumn("bookings", "idempotencyKeyId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "idempotency_keys",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    // Remove the foreign key column first
    await queryInterface.removeColumn("bookings", "idempotencyKeyId");

    // Then drop the idempotency_keys table
    await queryInterface.dropTable("idempotency_keys");
  },
};
