const CheckoutRepository = require("../repositories/checkoutRepository");
const { verifMail, DiketahuiWO } = require("./mail");
const { Checkout, User, Departement } = require("../models");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: checkouts } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, checkouts, totalPages, currentPage };
};

class CheckoutService {
  static async create({
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    DepartUserId,
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
        date_requestWO: new Date(),
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

  /* static async getAll(req) {
    try {
      const { size = 5, page = 0 } = req.query;

      const { limit, offset } = getPagination(page, size);

      const data = await Checkout.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: ["name", "id"],
          },
          {
            model: Departement,
            attributes: ["nama", "id"],
          },
        ],
      });
      const response = getPagingData(data, page, limit);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_checkout: null,
        },
      };
    }
  } */

  static async getAll() {
    try {
      const getAllCheckout = await Checkout.findAll({
        include: [
          {
            model: Departement,
            attributes: ["nama", "id"],
          },
          {
            model: User,
            as: "userRequest",
            attributes: ["name", "id"]

          }
        ],
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
      console.log(error)
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
        id
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
      console.log(error)
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
    User_IT,
    HeadITid,
  }) {
    try {
      // Melakukan check terhadap email
      const Check = await CheckoutRepository.getById({ id });

      const getEmailHeadIT = await CheckoutRepository.getEmailHeadIT({
        HeadITid,
      });

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
        User_IT,
        HeadITid,
        date_completionWO: new Date(),
      });
      await DiketahuiWO(getEmailHeadIT, updateCheckout);

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

  static async changeStatusWO({ id, otp}) {
    try {
      const statusWO = await CheckoutRepository.statusWorkOrder({
        id,
        otp,
        StatusWO: "Approve",
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
      console.log(error);
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

  static async changeStatusPengerjaan({ id, StatusPengerjaan }) {
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

  static async changeStatusProgress({ id }) {
    try {
      const statusPengerjaan = await CheckoutRepository.statusPengerjaan({
        id,
        StatusPengerjaan : "Close",
      });

      return {
        status: true,
        status_code: 200,
        message: "Work Order Telah Selesai",
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
