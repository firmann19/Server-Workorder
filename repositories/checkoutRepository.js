const { Checkout, User } = require("../models");

class CheckoutRepository {
  static async create({
    UserId,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    statusWO,
    email,
    otp,
  }) {
    const createdCheckout = Checkout.create({
      UserId,
      namaPeralatan,
      kodePeralatan,
      permasalahan,
      statusWO,
      email,
      otp,
    });

    return createdCheckout;
  }

  static async updateStatusWO({ otp, statusWO, email }) {
    const updatedCheckout = await Checkout.update(
      {
        otp,
        statusWO,
      },
      { where: { email } }
    );
    return updatedCheckout;
  }

  static async getByEmail({ email }) {
    const getCheckout = await Checkout.findOne({
      where: { email },
    });

    return getCheckout;
  }

  static async getCheckout({
    UserId,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    email,
  }) {
    const getCheckout = Checkout.findAll({
      include: [
        {
          model: User,
          attributes: [
            "name",
            "departement"
          ]
        }
      ],
      UserId,
      namaPeralatan,
      kodePeralatan,
      permasalahan,
      email
    });
    return getCheckout;
  }

  static async getCheckoutByID({ id }) {
    const getCheckoutById = await Checkout.findOne({
      where: {
        id: id,
      },
    });
    return getCheckoutById;
  }

  static async deleteByID({ id }) {
    const deletedCheckout = await Checkout.destroy({
      where: {
        id: id,
      },
    });
    return deletedCheckout;
  }
}

module.exports = CheckoutRepository;
