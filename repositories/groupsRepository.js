const { Op } = require("sequelize");
const { Group } = require("../models");

class GroupRepository {
  static async create({ nama }) {
    const createGroup = Group.create({
      nama,
    });

    return createGroup;
  }

  static async getById({ id }) {
    const getGroupById = await Group.findOne({
      where: { id },
    });

    return getGroupById;
  }

  static async getAllGroup() {
    const getAllGroup = Group.findAll({
      [Op.eq] : null
    });

    return getAllGroup;
  }

  static async updateGroup({ id, nama }) {
    const updateGroup = Group.update(
      {
        nama,
      },
      { where: { id } }
    );
    return updateGroup;
  }

  static async deleteById({ id }) {
    const deleteGroup = await Group.destroy({
      where: { id },
    });

    return deleteGroup;
  }
}

module.exports = GroupRepository;
