module.exports = (sequelize, DataTypes) => {
    const UserOtp = sequelize.define("UserOtp", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otp_code: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      expiry_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      tableName: "user_otps",
      timestamps: false,
    });
  
    return UserOtp;
  };
  