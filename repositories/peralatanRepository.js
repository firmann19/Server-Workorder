const { Peralatan } = require("../models");

class PeralatanRepository {
  static async create({ namaPeralatan, kodePeralatan }) {
    const createPeralatan = Peralatan.create({
      namaPeralatan,
      kodePeralatan,
    });

    return createPeralatan;
  }

  static async getById({ id }) {
    const getPeralatanById = await Peralatan.findOne({
      where: { id },
    });

    return getPeralatanById;
  }

  static async getAllPeralatan({ namaPeralatan, kodePeralatan }) {
    const getAllPeralatan = Peralatan.findAll({
      namaPeralatan,
      kodePeralatan,
    });

    return getAllPeralatan;
  }

  static async updatePeralatan({ id, namaPeralatan, kodePeralatan }) {
    const updatePeralatan = Peralatan.update(
      {
        namaPeralatan,
        kodePeralatan,
      },
      { where: { id } }
    );

    return updatePeralatan;
  }

  static async deleteById({ id }) {
    const deletePeralatan = await Peralatan.destroy({
      where: { id },
    });

    return deletePeralatan;
  }
}

module.exports = PeralatanRepository;
