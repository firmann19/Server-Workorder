const PosisiService = require("../services/posisiService");

const create = async (req, res, next) => {
  const { jabatan } = req.body;

  const { status, status_code, message, data } = await PosisiService.create({
    jabatan,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const {} = req.body;

  const { status, status_code, message, data } = await PosisiService.getAll({});

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await PosisiService.getPosisiById({
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

  const { jabatan } = req.body;

  const { status, status_code, message, data } =
    await PosisiService.updatePosisi({
      id,
      jabatan,
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
    await PosisiService.deletePosisi({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, deleteById };
