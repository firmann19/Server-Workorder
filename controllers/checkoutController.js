const CheckoutService = require("../services/checkoutService");

const create = async (req, res, next) => {
  const {
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await CheckoutService.create({
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const {
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await CheckoutService.getAll({
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
    otp,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await CheckoutService.getCheckoutById({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const update = async (req, res, next) => {
  const { id } = req.params;

  const {
    permasalahan,
    tindakan,
    gantiSparepart,
    peralatanId,
    userRequestId,
    userApproveId,
    userITid,
  } = req.body;

  const { status, status_code, message, data } =
    await CheckoutService.updateCheckout({
      id,
      permasalahan,
      tindakan,
      gantiSparepart,
      peralatanId,
      userRequestId,
      userApproveId,
      userITid,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await CheckoutService.deleteCheckout({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, deleteById };
