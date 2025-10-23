module.exports = (sequelize, DataTypes) => {
  const Calculators = sequelize.define(
    "Calculators",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tech_calculator_title: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      tech_calculator_detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tech_calculator_link: {
        type: DataTypes.STRING(152),
        allowNull: true,
      },
      tech_meta_title: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      tech_meta_des: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tech_lang_keys: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tech_parent: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      tech_no_index: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tech_related_cal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tech_cal_cat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tech_cal_sub_cat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tech_is_calculator: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      tech_content: {
        type: DataTypes.TEXT("long"), // Fixed this line
        allowNull: true,
      },
       tech_content_show: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "calculators",
      paranoid: false,
    }
  );

  return Calculators;
};
