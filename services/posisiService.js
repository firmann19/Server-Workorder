const { NotFoundError } = require("../errors");
const { Posisi } = require("../models");

module.exports = {
  createPosisi: async (req, res) => {
    const { jabatan } = req.body;

    if (!jabatan) {
      throw new BadRequestError("Posisi belum di input");
    }

    const createPosisi = await Posisi.create({
      jabatan,
    });
    return createPosisi;
  },

  getAllPosisi: async (req, res) => {
    const result = await Posisi.findAll();

    return result;
  },

  getOnePosisi: async (req, res) => {
    const { id } = req.params;

    const result = await Posisi.findOne({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada posisi dengan id :  ${id}`);

    return result;
  },

  updatePosisi: async (req, res) => {
    const { id } = req.params;

    const { jabatan } = req.body;

    if (!jabatan) {
      throw new BadRequestError("Posisi belum di input");
    }

    const check = await Posisi.findOne({ where: { id } });

    if (!check) throw new NotFoundError(`Tidak ada posisi dengan id :  ${id}`);

    const result = await Posisi.update(
      {
        jabatan,
      },
      { where: { id } }
    );
    return result;
  },

  deletePosisi: async (req, res) => {
    const { id } = req.params;

    const result = await Posisi.destroy({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada posisi dengan id :  ${id}`);

    return result;
  },
};
