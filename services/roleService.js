const { BadRequestError, NotFoundError } = require("../errors");
const { Role } = require("../models");

module.exports = {
  createRole: async (req, res) => {
    const { roleEmploye } = req.body;

    if (!roleEmploye) {
      throw new BadRequestError("Role belum di input");
    }

    const createRole = await Role.create({
      roleEmploye,
    });
    return createRole;
  },

  getAllRole: async (req, res) => {
    const result = await Role.findAll();

    return result;
  },

  getOneRole: async (req, res) => {
    const { id } = req.params;

    const result = await Role.findOne({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada role dengan id :  ${id}`);

    return result;
  },

  updateRole: async (req, res) => {
    const { id } = req.params;

    const { roleEmploye } = req.body;

    if (!roleEmploye) {
      throw new BadRequestError("Role belum di input");
    }

    const check = await Role.findOne({ where: { id } });

    if (!check) throw new NotFoundError(`Tidak ada role dengan id :  ${id}`);

    const result = await Role.update(
      {
        roleEmploye,
      },
      { where: { id } }
    );

    return result;
  },

  deleteRole: async (req, res) => {
    const { id } = req.params;

    const result = await Role.destroy({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada role dengan id :  ${id}`);

    return result;
  },
};
