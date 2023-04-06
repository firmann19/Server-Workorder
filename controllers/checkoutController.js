const checkoutService = require("../services/checkoutService");

const getAll = async (req, res, next) => {
  const {
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    email,
  } = req.body;

  const { status, status_code, message, data } = await checkoutService.getAll({
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
    UserId,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await checkoutService.create({
    UserId,
    namaPeralatan,
    kodePeralatan,
    permasalahan,
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

const deleteCheckoutID = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await checkoutService.deleteByID({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, updateStatusCheckout, getAll, getCheckoutID, deleteCheckoutID };
