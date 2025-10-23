module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        show_password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        phone_no: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM('male', 'female', 'other'),
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        user_role: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: 'user',
        },
        email_verified_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        remember_token: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          onUpdate: DataTypes.NOW,
        },
      },
      {
        timestamps: false, // kyun ke hum custom created_at aur updated_at use kar rahe hain
        tableName: "users",
        paranoid: false,
      }
    );
  
    User.associate = (models) => {
      // Associations yahan add karni hoon to kar sakte hain
    };
  
    return User;
  };
  