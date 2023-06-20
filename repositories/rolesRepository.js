const { Op } = require("sequelize");
const { Role } = require("../models");

class RoleRepository {
  static async create({ roleEmploye }) {
    const createRole = Role.create({
      roleEmploye,
    });

    return createRole;
  }

  static async getById({ id }) {
    const getRoleById = await Role.findOne({
      where: { id },
    });

    return getRoleById;
  }

  static async getAllRole() {
    const getAllRole = Role.findAll({
      [Op.eq]: null,
    });

    return getAllRole;
  }

  static async updateRole({ id, roleEmploye }) {
    const updateRole = Role.update(
      {
        roleEmploye,
      },
      { where: { id } }
    );
    return updateRole;
  }

  static async deleteById({ id }) {
    const deleteRole = await Role.destroy({
      where: { id },
    });

    return deleteRole;
  }
}

module.exports = RoleRepository;
