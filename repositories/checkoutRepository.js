const { Checkout, User } = require("../models");

class CheckoutRepository {
  static async create({
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
    const createCheckout = Checkout.create({
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

    return createCheckout;
  }

  static async getEmail({ UserApproveId }) {
    const userRecords = await User.findOne({
      where: { id: UserApproveId },
      attributes: ["email"],
    });

    return userRecords.email;
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
    const updateCheckout = Checkout.update(
      {
        namaBarang,
        kodeBarang,
        permasalahan,
        tindakan,
        gantiSparepart,
        UserRequestId,
        UserApproveId,
        StatusWO,
        otp,
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

  static async statusWorkOrder({ id, StatusWO }) {
    const statusWO = await Checkout.update({
      StatusWO
    },{
      where: { id },
    });

    return statusWO;
  }
}

module.exports = CheckoutRepository;
