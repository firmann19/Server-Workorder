const AuthService = require("../services/authService");

const register = async (req, res) => {
  const { name, email, posisi, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } = await AuthService.register({
    name,
    email,
    posisi,
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
    DepartementId
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const { name, email, posisi, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } = await AuthService.getAll({
    name,
    email,
    posisi,
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

const getAllUserByDepartementId = async (req, res, next) => {
  const { DepartementId} =
  req.body;
  
    const { status, status_code, message, data } =
      await AuthService.getAllUserByDepartementId({
        DepartementId,
      });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
};

const getAllApproved = async (req, res, next) => {
  const { name, email, posisi, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } =
    await AuthService.getAllApprove({
      name,
      email,
      posisi,
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

  const { name, email, posisi, password, roles, DepartementId, GroupId } =
    req.body;

  const { status, status_code, message, data } = await AuthService.updateUser({
    id,
    name,
    email,
    posisi,
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
  getAllApproved,
  getAllUserByDepartementId,
};
