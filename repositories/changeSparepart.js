const { Op } = require("sequelize");
const { ChangeSparepart, User } = require("../models");

class ChangeSparepartRepository {
  static async create({
    userRequestWo,
    departementUser,
    namaSparepart,
    harga,
    jumlahOrder,
    alasan,
    statusPengajuan,
    HeadIT
  }) {
    const createSparepart = ChangeSparepart.create({
      userRequestWo,
      departementUser,
      namaSparepart,
      harga,
      jumlahOrder,
      alasan,
      statusPengajuan,
      HeadIT
    });

    return createSparepart;
  }

  static async getById({ id }) {
    const getChangeSparepartById = await ChangeSparepart.findOne({
      where: { id },
    });

    return getChangeSparepartById;
  }

  static async getEmailHeadIT({ HeadIT }) {
    const ITRecords = await User.findOne({
      where: { id: HeadIT },
      attributes: ["email"],
    });

    return ITRecords.email;
  }

  static async getAllChangeSparepart() {
    const getAllChangeSparepart = ChangeSparepart.findAll({
      [Op.eq]: null,
    });

    return getAllChangeSparepart;
  }

  static async updateChangeSparepart({
    id,
    userRequestWo,
    departementUser,
    namaSparepart,
    harga,
    jumlahOrder,
    alasan,
    statusPengajuan,
    HeadIT
  }) {
    const updateChangeSparepart = ChangeSparepart.update(
      {
        userRequestWo,
        departementUser,
        namaSparepart,
        harga,
        jumlahOrder,
        alasan,
        statusPengajuan,
        HeadIT
      },
      { where: { id } }
    );
    return updateChangeSparepart;
  }

  static async deleteById({ id }) {
    const deleteChangeSparepart = await ChangeSparepart.destroy({
      where: { id },
    });

    return deleteChangeSparepart;
  }

  static async updateStatus({
    id,
    statusPengajuan,
  }) {
    const updateChangeSparepart = ChangeSparepart.update(
      {
        statusPengajuan,
      },
      { where: { id } }
    );
    return updateChangeSparepart;
  }
}

module.exports = ChangeSparepartRepository;
