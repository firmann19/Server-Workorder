const { Departement } = require("../models");

class DepartementRepository {
  static async create({ nama }) {
    const createDepartement = Departement.create({
      nama,
    });

    return createDepartement;
  }

  static async getById({ id }) {
    const getDepartementById = await Departement.findOne({
      where: { id },
    });

    return getDepartementById;
  }

  static async getAllDepartement({ nama }) {
    const getAllDepartement = Departement.findAll({
      nama,
    });

    return getAllDepartement;
  }

  static async updateDepartement({ id, nama }) {
    const updateDepartement = Departement.update(
      {
        nama,
      },
      { where: { id } }
    );
    return updateDepartement;
  }

  static async deleteById({ id }) {
    const deleteDepartement = await Departement.destroy({
      where: { id },
    });

    return deleteDepartement;
  }
}

module.exports = DepartementRepository;
