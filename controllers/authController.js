const AuthService = require("../services/authService");

const register = async (req, res) => {
  const { name, email, posisiId, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } = await AuthService.register({
    name,
    email,
    posisiId,
    password,
    roles,
    DepartementId,
    GroupId,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const login = async (req, res) => {
  const { email, password, DepartementId } = req.body;

  const { status, status_code, message, data } = await AuthService.login({
    email,
    password,
    DepartementId,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllApprove = async (req, res, next) => {
  const { name, email, posisiId, password, roles, DepartementId, GroupId } =
    req.user;

  console.log(req.user);

  const { status, status_code, message, data } =
    await AuthService.getAllApproveUsers({
      name,
      email,
      posisiId,
      password,
      roles,
      DepartementId,
      GroupId,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const { name, email, posisiId, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } = await AuthService.getAll({
    name,
    email,
    posisiId,
    password,
    roles,
    DepartementId,
    GroupId,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await AuthService.getUserById({
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

  const { name, email, posisiId, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } = await AuthService.updateUser({
    id,
    name,
    email,
    posisiId,
    password,
    roles,
    DepartementId,
    GroupId,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await AuthService.deleteUser({
    id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  register,
  login,
  getAll,
  getById,
  update,
  deleteById,
  getAllApprove,
};
