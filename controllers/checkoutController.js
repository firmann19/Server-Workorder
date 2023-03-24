const checkoutService = require("../services/checkoutService");

const getAll = async (req, res, next) => {
  const {
    user,
    departemen,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    email,
  } = req.body;

  const { status, status_code, message, data } = await checkoutService.getAll({
    user,
    departemen,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    email,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const create = async (req, res, next) => {
  const {
    user,
    departemen,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    email,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await checkoutService.create({
    user,
    departemen,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    email,
    otp,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateStatusCheckout = async (req, res, next) => {
  const { email, otp, statusWO } = req.body;

  const { status, status_code, message, data } =
    await checkoutService.updateStatus({
      otp,
      statusWO,
      email,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getCheckoutID = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await checkoutService.getCheckoutByID({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateByID = async (req, res, next) => {
  const { id } = req.params;
  const { tindakan, dikerjakan, infopergantian } = req.body;

  const { status, status_code, message, data } =
    await checkoutService.updateCheckout({
      id,
      tindakan,
      dikerjakan,
      infopergantian,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, updateStatusCheckout, getAll, getCheckoutID, updateByID };
