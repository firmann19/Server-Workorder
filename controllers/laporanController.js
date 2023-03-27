const laporanService = require("../services/laporanService");

const getAll = async (req, res, next) => {
  const {
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
    statusLaporan,
  } = req.body;

  const { status, status_code, message, data } = await laporanService.getAll({
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
    statusLaporan,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const create = async (req, res, next) => {
  const {
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
    otp,
  } = req.body;

  const { status, status_code, message, data } = await laporanService.create({
    CheckoutId,
    tindakan,
    gantiSparepart,
    dikerjakan,
    email,
    otp,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateStatusLaporan = async (req, res, next) => {
  const { email, otp, statusLaporan } = req.body;

  const { status, status_code, message, data } =
    await laporanService.updateStatus({
      otp,
      statusLaporan,
      email,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getLaporanID = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await laporanService.getLaporanByID({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteLaporanID = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await laporanService.deleteByID({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  create,
  updateStatusLaporan,
  getAll,
  getLaporanID,
  deleteLaporanID,
};
