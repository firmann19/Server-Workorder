const CheckoutRepository = require("../repositories/checkoutRepository");
const { verifMail, DiketahuiWO } = require("./mail");
const { Checkout, User, Departement } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");

module.exports = {
  createCheckout: async (req, res) => {
    const {
      namaBarang,
      kodeBarang,
      permasalahan,
      tindakan,
      gantiSparepart,
      UserRequestId,
      DepartUserId,
      UserApproveId,
      StatusWO,
    } = req.body;

    //Cek kondisi request body
    if (!namaBarang) {
      throw new BadRequestError("Mohon Input Nama Peralatan");
    } else if (!kodeBarang) {
      throw new BadRequestError("Mohon Input Kode Peralatan");
    } else if (!permasalahan) {
      throw new BadRequestError("Mohon Input Permasalahan");
    } else if (!UserApproveId) {
      throw new BadRequestError("Mohon Input User Approve");
    }

    const getEmail = await CheckoutRepository.getEmail({ UserApproveId });

    const createCheckout = await Checkout.create({
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

    await verifMail(getEmail, createCheckout);

    return createCheckout;
  },

  getAllCheckout: async (req, res) => {
    const result = await Checkout.findAll({
      include: [
        {
          model: Departement,
          attributes: ["nama", "id"],
        },
        {
          model: User,
          as: "userRequest",
          attributes: ["name", "id"],
        },
      ],
    });

    return result;
  },

  getOneCheckout: async (req, res) => {
    const { id } = req.params;

    const result = await Checkout.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "userRequest",
          attribubtes: ["name", "id"],
        },
        {
          model: User,
          as: "userApprove",
          attribubtes: ["name", "id"],
        },
        {
          model: User,
          as: "userIT",
          attribubtes: ["name", "id"],
        },
        {
          model: User,
          as: "HeadIT",
          attribubtes: ["name", "id"],
        },
        {
          model: Departement,
          attribubtes: ["nama", "id"],
        },
      ],
    });

    if (!result)
      throw new NotFoundError(`Tidak ada Checkout dengan id :  ${id}`);

    return result;
  },

  updateCheckout: async (req, res) => {
    const { id } = req.params;

    const { tindakan, gantiSparepart, User_IT, HeadITid } = req.body;

    //Cek kondisi request body
    if (!tindakan) {
      throw new BadRequestError("Mohon Input Nama Peralatan");
    } else if (!gantiSparepart) {
      throw new BadRequestError("Mohon Input Kode Peralatan");
    }

    const getEmailHeadIT = await CheckoutRepository.getEmailHeadIT({
      HeadITid,
    });

    const check = await Checkout.findOne({ where: { id } });

    if (!check)
      throw new NotFoundError(`Tidak ada checkout dengan id :  ${id}`);

    const result = await Checkout.update(
      {
        tindakan,
        gantiSparepart,
        User_IT,
        HeadITid,
        date_completionWO: new Date(),
      },
      { where: { id } }
    );

    await DiketahuiWO(getEmailHeadIT, result);

    return result;
  },

  deleteCheckout: async (req, res) => {
    const { id } = req.params;

    const result = await Checkout.destroy({
      where: { id },
    });

    if (!result)
      throw new NotFoundError(`Tidak ada Checkout dengan id :  ${id}`);

    return result;
  },

  changeStatusWo: async (req, res) => {
    const { id } = req.params;

    const { otp } = req.body;

    const check = await Checkout.findOne({ id });

    if (check) throw new NotFoundError(`Tidak ada checkout dengan id :  ${id}`);

    const result = await Checkout.update(
      {
        where: { id },
      },
      {
        otp,
        StatusWO: "Approve",
      }
    );

    return result;
  },

  changeStatusPengerjaan: async (req, res) => {
    const { id } = req.params;

    const { StatusPengerjaan } = req.body;

    const check = await Checkout.findOne({ id });

    if (check) throw new NotFoundError(`Tidak ada checkout dengan id :  ${id}`);

    const result = await Checkout.update(
      {
        where: { id },
      },
      {
        StatusPengerjaan,
      }
    );

    return result;
  },

  changeStatusProgress: async (req, res) => {
    const { id } = req.params;

    const check = await Checkout.findOne({ id });

    if (check) throw new NotFoundError(`Tidak ada checkout dengan id :  ${id}`);

    const result = await Checkout.update(
      {
        where: { id },
      },
      {
        StatusPengerjaan: "Close",
      }
    );

    return result;
  },
};
