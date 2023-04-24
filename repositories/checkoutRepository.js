const { Checkout, User } = require("../models");

class CheckoutRepository {
  static async create({
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp
  }) {
    const createCheckout = Checkout.create({
      permasalahan,
      tindakan,
      gantiSparepart,
      peralatanId,
      userRequestId,
      userApproveId,
      userITid,
      otp
    });

    return createCheckout;
  }

  static async getEmail({ userApproveId }) {
    const userRecords = await User.findOne({
      where: { id: userApproveId },
      attributes: ['email']
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
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  }) {
    const getAllCheckout = Checkout.findAll({
      permasalahan,
      tindakan,
      gantiSparepart,
      peralatanId,
      userRequestId,
      userApproveId,
      userITid,
      otp,
    });

    return getAllCheckout;
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
  }) {
    const updateCheckout = Checkout.update(
      {
        permasalahan,
        tindakan,
        gantiSparepart,
        peralatanId,
        userRequestId,
        userApproveId,
        userITid,
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
