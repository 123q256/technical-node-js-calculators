"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("categories", {
      category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      category_img: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      category_del: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      category_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("categories");
  },
};
