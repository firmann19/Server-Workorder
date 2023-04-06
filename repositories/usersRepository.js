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
    group,
    picture,
  }) {
    const createdUser = User.create({
      name,
      email,
      position,
      departement,
      group,
      password,
      role,
      picture,
    });

    return createdUser;
  }

  static async getUsers({
    name,
    email,
    position,
    departement,
    role,
    group,
    picture,
  }) {
    const getCheckout = User.findAll({
      name,
      email,
      position,
      departement,
      role,
      group,
      picture,
    });
    return this.getUsers;
  }

  static async deleteByID({ id }) {
    const deletedUser = await User.destroy({ where: { id } });

    return deletedUser;
  }
}

module.exports = UsersRepository;
