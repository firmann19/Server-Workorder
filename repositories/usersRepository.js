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
    posisi,
    roles,
    DepartementId,
    GroupId
  }) {
    const createdUser = User.create({
      name,
      email,
      posisi,
      password,
      roles,
      DepartementId,
      GroupId
    });

    return createdUser;
  }

  static async getUsers({
    name,
    email,
    position,
    roles,
    DepartementId,
    GroupId
  }) {
    const getCheckout = User.findAll({
      name,
      email,
      position,
      roles,
      DepartementId,
      GroupId
    });
    return this.getUsers;
  }

  static async deleteByID({ id }) {
    const deletedUser = await User.destroy({ where: { id } });

    return deletedUser;
  }
}

module.exports = UsersRepository;
