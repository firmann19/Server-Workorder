const PeralatanService = require("../services/peralatanService");

const create = async (req, res, next) => {
  const { namaPeralatan, kodePeralatan } = req.body;

  const { status, status_code, message, data } = await PeralatanService.create({
    namaPeralatan,
    kodePeralatan,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const { namaPeralatan, kodePeralatan } = req.body;

  const { status, status_code, message, data } = await PeralatanService.getAll({
    namaPeralatan,
    kodePeralatan,
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
    await PeralatanService.getPeralatanById({
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

  const { namaPeralatan, kodePeralatan } = req.body;

  const { status, status_code, message, data } =
    await PeralatanService.updatePeralatan({
      id,
      namaPeralatan,
      kodePeralatan,
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
    await PeralatanService.deletePeralatan({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, deleteById };
