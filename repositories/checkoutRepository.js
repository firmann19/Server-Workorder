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
}

module.exports = CheckoutRepository;
