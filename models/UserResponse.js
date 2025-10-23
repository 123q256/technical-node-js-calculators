module.exports = (sequelize, DataTypes) => {
  const UserResponse = sequelize.define(
    "UserResponse",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      feedback: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false,
      },
      calculator_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      page: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW, // for auto-updating `updated_at` field
      },
    },
    {
      timestamps: false, // we are using custom `created_at` and `updated_at`
      tableName: "user_responses",
      paranoid: false,
    }
  );

  UserResponse.associate = (models) => {
    // No associations for now
  };

  return UserResponse;
};
