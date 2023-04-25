const { User, Departement } = require("../models");

class UserRepository {
  static async create({
    name,
    email,
    password,
    posisi,
    roles,
    DepartementId,
    GroupId,
  }) {
    const createUser = User.create({
      name,
      email,
      password,
      posisi,
      roles,
      DepartementId,
      GroupId,
    });

    return createUser;
  }

  static async getByEmail({ email }) {
    const getUserByEmail = await User.findOne({
      where: { email },

        include: [{
          model: Departement,
          attribubtes: ["nama", "id"]
        }]
    });
    return getUserByEmail;
  }

  static async getById({ id }) {
    const getUserById = await User.findOne({
      where: { id },
    });
    return getUserById;
  }

  static async getAllUser({
    name,
    email,
    password,
    posisi,
    roles,
    DepartementId,
    GroupId,
  }) {
    const getAllUser = User.findAll({
      name,
      email,
      password,
      posisi,
      roles,
      DepartementId,
      GroupId,
    },
    );

    return getAllUser;
  }

  static async updateUser({
    id,
    name,
    email,
    password,
    posisi,
    roles,
    DepartementId,
    GroupId,
  }) {
    const updateUser = User.update(
      {
        name,
        email,
        password,
        posisi,
        roles,
        DepartementId,
        GroupId,
      },
      { where: { id } }
    );
    return updateUser;
  }

  static async deleteById({ id }) {
    const deleteUser = await User.destroy({
      where: { id },
    });

    return deleteUser;
  }
}

module.exports = UserRepository;
