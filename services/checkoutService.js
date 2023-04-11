const CheckoutRepository = require("../repositories/checkoutRepository");
const { verifMail } = require("./mail");

class CheckoutService {
  static async create({
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
  }) {
    try {
      const createdCheckout = await CheckoutRepository.create({
        permasalahan,
        tindakan,
        gantiSparepart,
        peralatanId,
        userRequestId,
        userApproveId,
        userITid,
        otp : Math.floor(Math.random() * 9999)
      });

      await verifMail(userApproveId, createdCheckout);

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
          created_checkout: null,
        },
      };
    }
  }

  static async getAll({
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  }) {
    try {
      const getAllCheckout = await CheckoutRepository.getAllCheckout({
        permasalahan,
        tindakan,
        gantiSparepart,
        peralatanId,
        userRequestId,
        userApproveId,
        userITid,
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
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  }) {
    try {
      // Melakukan check terhadap email
      const Check = await CheckoutRepository.getById({ id });

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
        permasalahan,
        tindakan,
        gantiSparepart,
        peralatanId,
        userRequestId,
        userApproveId,
        userITid,
        otp,
      });

      return {
        status: true,
        status_code: 200,
        message: "update departement successfully",
        data: {
          update_Checkout: updateCheckout,
        },
      };
    } catch (error) {
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
}

module.exports = CheckoutService;
