const { Checkout, User } = require("../models");

class CheckoutRepository {
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
    otp,
    date_requestWO,
  }) {
    const createCheckout = Checkout.create({
      UserRequestId,
      DepartUserId,
      namaBarang,
      kodeBarang,
      permasalahan,
      tindakan,
      gantiSparepart,
      UserApproveId,
      StatusWO,
      otp,
      date_requestWO,
    });

    return createCheckout;
  }

  static async getEmail({ UserApproveId }) {
    const userRecords = await User.findOne({
      where: { id: UserApproveId },
      attributes: ["email"],
    });

    return userRecords.email;
  }

  static async getEmailHeadIT({ HeadITid }) {
    const ITRecords = await User.findOne({
      where: { id: HeadITid },
      attributes: ["email"],
    });

    return ITRecords.email;
  }

  static async getById({ id }) {
    const getCheckoutById = await Checkout.findOne({
      where: { id },
    });

    return getCheckoutById;
  }

  static async getAllCheckout({
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    UserApproveId,
    StatusWO,
    otp,
  }) {
    const getAllCheckout = Checkout.findAll({
      namaBarang,
      kodeBarang,
      permasalahan,
      tindakan,
      gantiSparepart,
      UserRequestId,
      UserApproveId,
      StatusWO,
      otp,
    });

    return getAllCheckout;
  }

  static async updateCheckout({
    id,
    tindakan,
    gantiSparepart,
    User_IT,
    HeadITid,
    date_completionWO,
  }) {
    const updateCheckout = Checkout.update(
      {
        tindakan,
        gantiSparepart,
        User_IT,
        HeadITid,
        date_completionWO,
      },
      { where: { id } }
    );
    return updateCheckout;
  }

  static async deleteById({ id }) {
    const deletedCheckout = await Checkout.destroy({
      where: { id },
    });

    return deletedCheckout;
  }

  static async statusWorkOrder({ id, StatusWO, otp }) {
    const statusWO = await Checkout.update(
      {
        StatusWO,
        otp,
      },
      {
        where: { id },
      }
    );

    return statusWO;
  }

  static async statusPengerjaan({ id, StatusPengerjaan }) {
    const statusPengerjaan = await Checkout.update(
      {
        StatusPengerjaan,
      },
      {
        where: { id },
      }
    );
    return statusPengerjaan;
  }
}

module.exports = CheckoutRepository;
