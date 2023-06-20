const RoleService = require("../services/roleService");

const create = async (req, res, next) => {
  const { roleEmploye } = req.body;

  const { status, status_code, message, data } = await RoleService.create({
    roleEmploye,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const {} = req.body;

  const { status, status_code, message, data } = await RoleService.getAll({});

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await RoleService.getRoleById({
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

  const { roleEmploye } = req.body;

  const { status, status_code, message, data } = await RoleService.updateRole({
    id,
    roleEmploye,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await RoleService.deleteRole({
    id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, deleteById };
