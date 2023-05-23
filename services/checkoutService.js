const CheckoutRepository = require("../repositories/checkoutRepository");
const { verifMail, DiketahuiWO } = require("./mail");

class CheckoutService {
  static async create({
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    DepartUserId,
    date_requestWO,
    UserApproveId,
    StatusWO,
  }) {
    try {
      const getEmail = await CheckoutRepository.getEmail({ UserApproveId });

      const createdCheckout = await CheckoutRepository.create({
        namaBarang,
        kodeBarang,
        permasalahan,
        tindakan,
        gantiSparepart,
        UserRequestId,
        DepartUserId,
        UserApproveId,
        StatusWO,
        otp: Math.floor(Math.random() * 9999),
        date_requestWO: new Date('T00:00:00.000Z'),
      });

      await verifMail(getEmail, createdCheckout);

      return {
        status: true,
        status_code: 201,
        message: "Post created successfully",
        data: {
          created_checkout: createdCheckout,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_checkout: null,
        },
      };
    }
  }

  static async getAll({
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    UserApproveId,
    date_requestWO,
    StatusWO,
    otp,
  }) {
    try {
      const getAllCheckout = await CheckoutRepository.getAllCheckout({
        namaBarang,
        kodeBarang,
        permasalahan,
        tindakan,
        gantiSparepart,
        UserRequestId,
        UserApproveId,
        date_requestWO,
        StatusWO,
        otp,
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
          getAll_checkout: null,
        },
      };
    }
  }

  static async getCheckoutById({ id }) {
    try {
      const getCheckoutById = await CheckoutRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getCheckout_ById: getCheckoutById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getCheckout_ById: null,
        },
      };
    }
  }

  static async updateCheckout({
    id,
    tindakan,
    gantiSparepart,
    UserIT,
    HeadITid,
  }) {
    try {
      // Melakukan check terhadap email
      const Check = await CheckoutRepository.getById({ id });

      const getEmail = await CheckoutRepository.getEmailHeadIT({ HeadITid });

      // Jika input Id salah, maka akan memberikan message "id salah"
      if (!Check) {
        return {
          status: false,
          status_code: 400,
          message: "Id Salah",
          data: {
            registered_user: null,
          },
        };
      }

      const updateCheckout = await CheckoutRepository.updateCheckout({
        id,
        tindakan,
        gantiSparepart,
        UserIT,
        HeadITid,
        date_completionWO: new Date(),
      });
      await DiketahuiWO(getEmail, updateCheckout);

      return {
        status: true,
        status_code: 200,
        message: "update departement successfully",
        data: {
          update_Checkout: updateCheckout,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_Checkout: null,
        },
      };
    }
  }

  static async deleteCheckout({ id }) {
    try {
      const deletedCheckout = await CheckoutRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "delete departement successfully",
        data: {
          delete_Checkout: deletedCheckout,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_Checkout: null,
        },
      };
    }
  }

  static async changeStatusWO({ id, StatusWO }) {
    try {
      const statusWO = await CheckoutRepository.statusWorkOrder({
        id,
        StatusWO,
      });

      return {
        status: true,
        status_code: 200,
        message: "status Work Order successfully",
        data: {
          status_WO: statusWO,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          statusWO: null,
        },
      };
    }
  }

  static async changeStatusPengerjaan({id, StatusPengerjaan}) {
    try {
      const statusPengerjaan = await CheckoutRepository.statusPengerjaan({
        id,
        StatusPengerjaan,
      });

      return {
        status: true,
        status_code: 200,
        message: "status Pengerjaan successfully",
        data: {
          status_Pengerjaan: statusPengerjaan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          statusPengerjaan: null,
        },
      };
    }
  }
}

module.exports = CheckoutService;
