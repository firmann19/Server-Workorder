const { Op } = require("sequelize");
const { Posisi } = require("../models");

class PosisiRepository {
  static async create({ jabatan }) {
    const createPosisi = Posisi.create({
      jabatan,
    });

    return createPosisi;
  }

  static async getById({ id }) {
    const getPosisiById = await Posisi.findOne({
      where: { id },
    });

    return getPosisiById;
  }

  static async getAllPosisi() {
    const getAllPosisi = Posisi.findAll({
      [Op.eq]: null,
    });

    return getAllPosisi;
  }

  static async updatePosisi({ id, jabatan }) {
    const updatePosisi = Posisi.update(
      {
        jabatan,
      },
      { where: { id } }
    );
    return updatePosisi;
  }

  static async deleteById({ id }) {
    const deletePosisi = await Posisi.destroy({
      where: { id },
    });

    return deletePosisi;
  }
}

module.exports = PosisiRepository;
