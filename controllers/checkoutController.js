const { getAllCheckout } = require("../repositories/checkoutRepository");
const CheckoutService = require("../services/checkoutService");

const create = async (req, res, next) => {
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
    otp,
    date_requestWO,
  } = req.body;

  const { status, status_code, message, data } = await CheckoutService.create({
    namaBarang,
    kodeBarang,
    permasalahan,
    tindakan,
    gantiSparepart,
    UserRequestId,
    DepartUserId,
    UserApproveId,
    StatusWO,
    otp,
    date_requestWO,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  try {
    const result = await CheckoutService.getAll(req);

    res.status(200).send({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
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

  const { tindakan, gantiSparepart, User_IT, HeadITid, date_completionWO } =
    req.body;

  const { status, status_code, message, data } =
    await CheckoutService.updateCheckout({
      id,
      tindakan,
      gantiSparepart,
      User_IT,
      HeadITid,
      date_completionWO,
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

  const { status, status_code, message, data } =
    await CheckoutService.changeStatusWO({
      id,
      StatusWO,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const statusPengerjaan = async (req, res, next) => {
  const { id } = req.params;
  const { StatusPengerjaan } = req.body;

  const { status, status_code, message, data } =
    await CheckoutService.changeStatusPengerjaan({
      id,
      StatusPengerjaan,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  statusWO,
  statusPengerjaan,
  deleteById,
};
