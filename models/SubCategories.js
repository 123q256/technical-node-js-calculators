module.exports = (sequelize, DataTypes) => {
  const SubCategories = sequelize.define(
    "SubCategories",
    {
      sub_category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sub_category_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sub_category_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "sub_categories",
      paranoid: false,
    }
  );

  SubCategories.associate = (models) => {
    SubCategories.belongsTo(models.Categories, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
  };

  return SubCategories;
};
