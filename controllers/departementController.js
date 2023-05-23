const DepartementService = require("../services/departementService");

const create = async (req, res, next) => {
  const { nama } = req.body;

  const { status, status_code, message, data } =
    await DepartementService.create({
      nama,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const {  } = req.body;

  const { status, status_code, message, data } =
    await DepartementService.getAll({
      
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
    await DepartementService.getDepartementById({
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

  const { nama } = req.body;

  const { status, status_code, message, data } =
    await DepartementService.updateDepartement({
      id,
      nama,
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
    await DepartementService.deleteDepartement({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, deleteById };
