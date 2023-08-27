const { NotFoundError } = require("../errors");
const { Group } = require("../models");

module.exports = {
  createGroup: async (req, res) => {
    const { nama } = req.body;

    if (!nama) {
      throw new BadRequestError("Nama Group belum di input");
    }

    const createGroup = await Group.create({
      nama,
    });
    return createGroup;
  },

  getAllGroup: async (req, res) => {
    const result = await Group.findAll();

    return result;
  },

  getOneGroup: async (req, res) => {
    const { id } = req.params;

    const result = await Group.findOne({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada group dengan id :  ${id}`);

    return result;
  },

  updateGroup: async (req, res) => {
    const { id } = req.params;

    const { nama } = req.body;

    if (!nama) {
      throw new BadRequestError("Nama Group belum di input");
    }

    const check = await Group.findOne({ where: { id } });

    if (!check) throw new NotFoundError(`Tidak ada group dengan id :  ${id}`);

    const result = await Group.update(
      {
        nama,
      },
      { where: { id } }
    );
    return result;
  },

  deleteGroup: async (req, res) => {
    const { id } = req.params;

    const result = await Group.destroy({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada group dengan id :  ${id}`);

    return result;
  },
};
