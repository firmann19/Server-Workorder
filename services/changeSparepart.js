const { NotFoundError } = require("../errors");
const { ChangeSparepart } = require("../models");
const ChangeSparepartRepository = require("../repositories/changeSparepart");
const { ApproveSparepart } = require("./mail");

module.exports = {
  createChangeSparepart: async (req, res) => {
    const {
      userRequestWo,
      departementUser,
      namaSparepart,
      harga,
      jumlahOrder,
      alasan,
      statusPengajuan,
      HeadIT,
    } = req.body;

    //Cek kondisi
    if (!namaSparepart) {
      throw new BadRequestError("Nama belum di input");
    } else if (!harga) {
      throw new BadRequestError("Email belum di input");
    } else if (!jumlahOrder) {
      throw new BadRequestError("Posisi belum di input");
    } else if (!alasan) {
      throw new BadRequestError("Role belum di input");
    } else if (!statusPengajuan) {
      throw new BadRequestError("Password belum di input");
    }

    const getEmail = await ChangeSparepartRepository.getEmailHeadIT({
      HeadIT,
    });

    const createChangeSparepart = await ChangeSparepart.create({
      userRequestWo,
      departementUser,
      namaSparepart,
      harga,
      jumlahOrder,
      alasan,
      statusPengajuan,
      HeadIT,
    });

    await ApproveSparepart(getEmail, createChangeSparepart);

    return createChangeSparepart;
  },

  getAllChangeSparepart: async (req, res) => {
    const result = await ChangeSparepart.findAll();

    return result;
  },

  getOneChangeSparepart: async (req, res) => {
    const { id } = req.params;

    const result = await ChangeSparepart.findOne({
      where: { id },
    });

    if (!result)
      throw new NotFoundError(`Tidak ada ChangeSparepart dengan id :  ${id}`);

    return result;
  },

  updateChangeSparepart: async (req, res) => {
    const { id } = req.params;

    const {
      userRequestWo,
      departementUser,
      namaSparepart,
      harga,
      jumlahOrder,
      alasan,
      statusPengajuan,
      HeadIT,
    } = req.body;

    //Cek kondisi
    if (!namaSparepart) {
      throw new BadRequestError("Nama belum di input");
    } else if (!harga) {
      throw new BadRequestError("Email belum di input");
    } else if (!jumlahOrder) {
      throw new BadRequestError("Posisi belum di input");
    } else if (!alasan) {
      throw new BadRequestError("Role belum di input");
    } else if (!statusPengajuan) {
      throw new BadRequestError("Password belum di input");
    }

    const check = await ChangeSparepart.findOne({ where: { id } });

    if (!check)
      throw new NotFoundError(`Tidak ada departement dengan id :  ${id}`);

    const result = await ChangeSparepart.update(
      {
        userRequestWo,
        departementUser,
        namaSparepart,
        harga,
        jumlahOrder,
        alasan,
        statusPengajuan,
        HeadIT,
      },
      { where: { id } }
    );
    return result;
  },

  deleteChangeSparepart: async (req, res) => {
    const { id } = req.params;

    const result = await ChangeSparepart.destroy({
      where: { id },
    });

    if (!result)
      throw new NotFoundError(`Tidak ada ChangeSparepart dengan id :  ${id}`);

    return result;
  },

  changeStatusPengajuan: async (req, res) => {
    const { id } = req.params;

    const check = await ChangeSparepart.findOne({ id });

    if (check)
      throw new NotFoundError(`Tidak ada departement dengan id :  ${id}`);

    const result = await ChangeSparepart.update(
      {
        statusPengajuan,
      },
      { where: { id } }
    );

    return result;
  },
};
