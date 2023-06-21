const { User, Departement, Role, Group, Posisi } = require("../models");

class UserRepository {
  static async create({
    name,
    email,
    password,
    posisiId,
    roles,
    DepartementId,
    GroupId,
  }) {
    const createUser = User.create({
      name,
      email,
      password,
      posisiId,
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
        },
        {
          model: Role,
          attribubtes: ["roleEmploye", "id"]
        }
      ]
    });
    return getUserByEmail;
  }

  static async getById({ id }) {
    const getUserById = await User.findOne({
      where: { id },
      include: [{
        model: Departement,
        attribubtes: ["nama", "id"]
      },
      {
        model: Group,
        attribubtes: ["nama", "id"]
      },
      {
        model: Posisi,
        attribubtes: ["jabatan", "id"]
      },
      {
        model: Role,
        attribubtes: ["roleEmploye", "id"]
      }
    ]
    });
    return getUserById;
  }

  static async getAllUser({
    DepartementId,
    GroupId,
    roles,
    posisiId
  }) {
    const getAllUser = User.findAll({
      email,
      password,
      posisiId,
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
    posisiId,
    roles,
    DepartementId,
    GroupId,
  }) {
    const updateUser = User.update(
      {
        name,
        email,
        password,
        posisiId,
        roles,
        DepartementId,
        GroupId,
      },
      { where: { id }}
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
