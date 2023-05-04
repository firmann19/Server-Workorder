const CheckoutService = require("../services/checkoutService");

const create = async (req, res, next) => {
  const {
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    UserApproveId,
    StatusWO,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await CheckoutService.create({
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

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const {
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    UserApproveId,
    StatusWO,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await CheckoutService.getAll({
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
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    UserApproveId,
    StatusWO,
    otp,
  } = req.body;

  const { status, status_code, message, data } =
    await CheckoutService.updateCheckout({
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

const statusWO = async (req, res, next) => {
  const { id } = req.params;
  const { StatusWO } = req.body;

  const { status, status_code, message, data } = await CheckoutService.changeStatusWO(
    {
      id,
      StatusWO,
    }
  );

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, statusWO, deleteById };
