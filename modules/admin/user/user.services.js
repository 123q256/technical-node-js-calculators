const { Op } = require("sequelize");
const db = require("../../../models");
const { UserResponse, User } = db;
// ✅ Update User
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const path = require("path");
const ACCESS_TOKEN_SECRET = "euwjhfilrwebdlsuifkjb3whks";
const REFRESH_TOKEN_SECRET = "euwjhfilrwebdlsuifkjb3whks";
const OTP_EXPIRY_MINUTES = 5; // 5 minutes

const PROFILE_IMG_PATH = path.join(__dirname, "../uploads/profile_images");

class UserService {
  async getAdminAndEditorLogin(body) {
    try {
      const { email, password } = body;

      // Step 1: Find admin/editor by email
      const user = await User.findOne({
        where: {
          email,
          user_role: { [Op.or]: ["admin", "editor"] },
        },
        attributes: [
          "id",
          "name",
          "email",
          "user_role",
          "status",
          "password",
          "remember_token",
        ],
      });

      if (!user) {
        return { error: true, message: "Invalid email or role" };
      }

      // 🚫 STEP 1.5: STATUS CHECK
      if (Number(user.status) != 1) {
        return {
          error: true,
          message: "You are not active, please contact admin",
        };
      }

      // Step 2: Password check
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { error: true, message: "Invalid password" };
      }

      // Step 3: Generate tokens (⏰ 24 HOURS EXPIRY)
      const accessToken = jwt.sign(
        { id: user.id, role: user.user_role },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" } // ✅ 1 day
      );

      const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      // Step 4: Save refresh token
      user.remember_token = refreshToken;
      await user.save();

      // Step 5: Remove password from response
      const { password: _pwd, ...userWithoutPassword } = user.toJSON();

      // Step 6: Return response
      return {
        error: false,
        message: "Login successful",
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Login error:", error.message);
      return {
        error: true,
        message: "Internal server error",
      };
    }
  }

  async getAdminAndEditorUsers() {
    try {
      const users = await User.findAll({
        where: {
          user_role: {
            [Op.or]: ["admin", "editor"],
          },
        },
        attributes: ["id", "name", "email", "user_role", "status"],
        order: [["user_role", "ASC"]],
      });
      return users;
    } catch (error) {
      console.error("Error fetching admin/editor users:", error);
      throw error;
    }
  }

  async getAllUserResponses() {
    try {
      const responses = await UserResponse.findAll({
        attributes: [
          "id",
          "feedback",
          "calculator_name",
          "page",
          "created_at",
          "updated_at",
        ],
        order: [["created_at", "DESC"]],
      });
      return responses;
    } catch (error) {
      console.error("Error fetching user responses:", error);
      throw error;
    }
  }

  // ✅ Create User
  async createUser(body) {
    const { name, email, password, user_role, status } = body;
    // Password ko hash karo
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // User create karo hashed password ke sath, aur plain text password show_password mein rakho
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      user_role,
      status,
      show_password: password, // plain text password save kar rahe hain
    });

    return newUser;
  }

  // ✅ Get User by ID
  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "name",
        "email",
        "user_role",
        "status",
        "show_password",
      ], // only required fields
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUers(id, body) {
    const { name, email, password, user_role, status } = body;
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    let hashedPassword;
    if (password) {
      // Hash the password only if password is provided/updated
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    await user.update({
      name,
      email,
      password: hashedPassword || user.password, // agar password na aaye to purana rakhlo
      user_role,
      status,
      show_password: password || user.show_password, // plain text password ya purana
    });

    return user;
  }

  // ✅ Delete User
  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return { message: "User deleted successfully" };
  }

  async updateUer(id, body) {
    const { name, email, password, user_role, status } = body;

    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    let hashedPassword;
    if (password) {
      // Hash the password only if password is provided/updated
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }
  }

  async updatestatus(id, body) {
    // Find user by primary key (id)
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    // Toggle status: agar 1 hai to 0, agar 0 hai to 1
    const newStatus = user.status == 1 ? 0 : 1;
    // Update only status
    await user.update({ status: newStatus });
    return user; // updated user return karen
  }
}

module.exports = new UserService();
