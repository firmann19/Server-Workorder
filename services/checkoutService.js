const CheckoutRepository = require("../repositories/checkoutRepository");
const { disetujuiMail } = require("./mail");


class CheckoutService {
  static async getAll({
    user,
    namaPeralatan,
    kodePeralatan,
    departemen,
    permasalahan,
    email,
  }) {
    try {
      const getAllCheckout = await CheckoutRepository.getCheckout({
        user,
        namaPeralatan,
        kodePeralatan,
        departemen,
        permasalahan,
        email,
      });
      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_checkout: getAllCheckout,
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

  static async create({
    user,
    namaPeralatan,
    kodePeralatan,
    departemen,
    permasalahan,
    email,
    pemohon,
  }) {
    try {
      const createdCheckout = await CheckoutRepository.create({
        user,
        namaPeralatan,
        kodePeralatan,
        departemen,
        permasalahan,
        email,
        pemohon,
        otp: Math.floor(Math.random() * 9999),
      });

      await disetujuiMail(email, createdCheckout);

      return {
        status: true,
        status_code: 201,
        message: "Post created successfully",
        data: {
          created_checkout: createdCheckout,
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
      const Check = await CheckoutRepository.getByEmail({ email });

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
        const updatedCheckout = await CheckoutRepository.updateStatusWO({
          email,
          statusWO: "disetujui",
        });

        return {
          status: true,
          status_code: 200,
          message: "Updated Status successfully",
          data: {
            updated_checkout: updatedCheckout,
          },
        };
      }
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

  static async getCheckoutByID({ id }) {
    try {
      const getCheckout = await CheckoutRepository.getCheckoutByID({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: {
          checkout: getCheckout,
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
      const deletedCheckout = await CheckoutRepository.deleteByID({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Deleted Successfully",
        data: {
          deleted_checkout: deletedCheckout,
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

module.exports = CheckoutService;
