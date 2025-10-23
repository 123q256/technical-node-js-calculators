"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("calculators", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tech_calculator_title: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      tech_calculator_detail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_calculator_link: {
        type: Sequelize.STRING(152),
        allowNull: true,
      },
      tech_meta_title: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      tech_meta_des: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_lang_keys: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_parent: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      tech_no_index: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tech_related_cal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_cal_cat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_cal_sub_cat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_is_calculator: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      tech_content_show: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      tech_content: {
        type: Sequelize.TEXT, // Replacing Sequelize.LONGTEXT with Sequelize.TEXT
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("calculators");
  },
};
