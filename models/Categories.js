module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      category_img: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      category_del: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      category_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false, // 👈 updated_at ko hata diya hai
      tableName: "categories",
      paranoid: false,
    }
  );

  Categories.associate = (models) => {
    // No associations needed for now
  };

  return Categories;
};
