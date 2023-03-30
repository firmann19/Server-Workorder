const { Checkout, Laporan } = require("../models");

class LaporanRepository {
  static async create({
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
    otp,
  }) {
    const createdLaporan = Laporan.create({
      CheckoutId,
      tindakan,
      gantiSparepart,
      dikerjakan,
      email,
      otp,
    });

    return createdLaporan;
  }

  static async updateStatusLaporan({ otp, statusLaporan, email }) {
    const updatedLaporan = await Laporan.update(
      {
        otp,
        statusLaporan,
      },
      { where: { email } }
    );
    return updatedLaporan;
  }

  static async getByEmail({ email }) {
    const getLaporan = await Laporan.findOne({
      where: { email },
    });

    return getLaporan;
  }

  static async getLaporan({
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
  }) {
    const getLaporan = Laporan.findAll({
      include: [
        {
          model: Checkout,
          attributes: [
            "UserId",
            "namaPeralatan",
            "kodePeralatan",
            "permasalahan",
            "email",
            "statusWO"
        ],
        },
      ],
      CheckoutId,
      tindakan,
      gantiSparepart,
      dikerjakan,
      email,
    });
    return getLaporan;
  }

  static async getLaporanByID({ id }) {
    const getLaporanById = await Laporan.findOne({
      where: {
        id: id,
      },
    });
    return getLaporanById;
  }

  static async deleteByID({ id }) {
    const deletedLaporan = await Laporan.destroy({
      where: {
        id: id,
      },
    });
    return deletedLaporan;
  }
}

module.exports = LaporanRepository;
