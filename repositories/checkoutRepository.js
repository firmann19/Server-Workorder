const { Checkout } = require("../models");

class CreateRepository {
  static async create({
    user,
    namaPeralatan,
    kodePeralatan,
    departemen,
    permasalahan,
    email,
    statusWO,
    otp,
  }) {
    const createdCheckout = Checkout.create({
      user,
      namaPeralatan,
      kodePeralatan,
      departemen,
      permasalahan,
      email,
      statusWO,
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
    const getCheckout = await Checkout.findOne({ where: { email } });

    return getCheckout;
  }

  static async getCheckout({
    user,
    namaPeralatan,
    kodePeralatan,
    departemen,
    permasalahan,
    email,
  }) {
    const getCheckout = Checkout.findAll(
      user,
      namaPeralatan,
      kodePeralatan,
      departemen,
      permasalahan,
      email
    );
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

  static async updateByID({ id, user, infopergantian, tindakan, dikerjakan }) {
    const updateCheckout = await Checkout.update(
      {
        tindakan,
        dikerjakan,
        infopergantian,
      },
      { where: { id } }
    );
    return updateCheckout;
  }
}

module.exports = CreateRepository;
