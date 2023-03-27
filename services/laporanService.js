const LaporanRepository = require("../repositories/laporanRepository");
const { verifMail } = require("./mail");

class LaporanService {
  static async getAll({
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
  }) {
    try {
      const getAllLaporan = await LaporanRepository.getLaporan({
        CheckoutId,
        tindakan,
        gantiSparepart,
        dikerjakan,
        email,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_laporan: getAllLaporan,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async create({
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
  }) {
    try {
      const createdLaporan = await LaporanRepository.create({
        CheckoutId,
        tindakan,
        gantiSparepart,
        dikerjakan,
        email,
        otp: Math.floor(Math.random() * 9999),
      });

      await verifMail(email, createdLaporan);

      return {
        status: true,
        status_code: 201,
        message: "Post created successfully",
        data: {
          created_laporan: createdLaporan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async updateStatus({ otp, email }) {
    try {
      // Melakukan check terhadap email
      const Check = await LaporanRepository.getByEmail({ email });

      // Jika emailnya tidak terdaftar, maka akan memberikan message "Email tidak terdaftar"
      if (!Check) {
        return {
          status: false,
          status_code: 400,
          message: "Email tidak terdaftar",
          data: {
            registered_user: null,
          },
        };
      }

      // Jika emailnya ada, tetapi kode otp nya salah maka akan memberikan message "kode otp salah"
      if (Check && Check.otp !== otp) {
        return {
          status: false,
          status_code: 400,
          message: "Kode otp salah",
          data: {
            registered_user: null,
          },
        };
      }

      if (Check.otp == otp) {
        const updatedLaporan = await LaporanRepository.updateStatusLaporan({
          email,
          statusLaporan: "diketahui",
        });

        return {
          status: true,
          status_code: 200,
          message: "Updated Status successfully",
          data: {
            updated_laporan: updatedLaporan,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async getLaporanByID({ id }) {
    try {
      const getLaporan = await LaporanRepository.getLaporanByID({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: {
          laporan: getLaporan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async deleteByID({ id }) {
    try {
      const deletedLaporan = await LaporanRepository.deleteByID({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Deleted Successfully",
        data: {
          deleted_laporan: deletedLaporan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = LaporanService;
