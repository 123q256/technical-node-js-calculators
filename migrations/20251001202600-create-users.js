'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      show_password: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      phone_no: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      user_role: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'user'
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: '1'
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      remember_token: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      google_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true
      },
      role_plan: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      subscription_status: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      subscription_start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      subscription_end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};