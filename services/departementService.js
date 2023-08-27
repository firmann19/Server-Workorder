const { NotFoundError, BadRequestError } = require("../errors");
const { Departement } = require("../models");

module.exports = {
  createDepartement: async (req, res) => {
    const { nama } = req.body;

    if (!nama) {
      throw new BadRequestError("Nama Departement belum di input");
    }

    const createGroup = await Departement.create({
      nama,
    });
    return createGroup;
  },

  getAllDepartement: async (req, res) => {
    const result = await Departement.findAll();

    return result;
  },

  getOneDepartement: async (req, res) => {
    const { id } = req.params;

    const result = await Departement.findOne({
      where: { id },
    });

    if (!result)
      throw new NotFoundError(`Tidak ada departement dengan id :  ${id}`);

    return result;
  },

  updateDepartement: async (req, res) => {
    const { id } = req.params;

    const { nama } = req.body;

    if (!nama) {
      throw new BadRequestError("Nama Departement belum di input");
    }

    const check = await Departement.findOne({ where: { id } });

    if (!check)
      throw new NotFoundError(`Tidak ada departement dengan id :  ${id}`);

    const result = await Departement.update(
      {
        nama,
      },
      { where: { id } }
    );
    return result;
  },

  deleteDepartement: async (req, res) => {
    const { id } = req.params;

    const result = await Departement.destroy({
      where: { id },
    });

    if (!result)
      throw new NotFoundError(`Tidak ada departement dengan id :  ${id}`);

    return result;
  },
};
