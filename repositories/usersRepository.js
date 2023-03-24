const { User } = require("../models");

class UsersRepository {
  static async getByID({ id }) {
    const getUser = await User.findOne({ where: { id } });

    return getUser;
  }

  static async getByEmail({ email }) {
    const getUser = await User.findOne({ where: { email } });

    return getUser;
  }

  static async create({
    name,
    email,
    password,
    position,
    departement,
    role,
    picture,
  }) {
    const createdUser = User.create({
      name,
      email,
      position,
      departement,
      password,
      role,
      picture,
    });

    return createdUser;
  }

  static async deleteByID({ id }) {
    const deletedUser = await User.destroy({ where: { id } });

    return deletedUser;
  }
}

module.exports = UsersRepository;
