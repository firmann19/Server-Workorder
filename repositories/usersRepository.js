const {
  User,
  Departement,
  Role,
} = require("../models");

class UserRepository {
  static async getByEmail({ email }) {
    const getUserByEmail = await User.findOne({
      where: { email },

      include: [
        {
          model: Departement,
          attribubtes: ["nama", "id"],
        },
        {
          model: Role,
          attribubtes: ["roleEmploye", "id"],
        },
      ],
    });
    return getUserByEmail;
  }

  static async getAllUser() {
    const getAllUser = User.findAll({
      include: [
        {
          model: Role,
          attribubtes: ["roleEmploye", "id"],
        },
      ],
    });

    return getAllUser;
  }
}

module.exports = UserRepository;
