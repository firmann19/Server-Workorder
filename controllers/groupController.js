const GroupService = require("../services/groupService");

const create = async (req, res, next) => {
  const { nama } = req.body;

  const { status, status_code, message, data } = await GroupService.create({
    nama,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const { nama } = req.body;

  const { status, status_code, message, data } = await GroupService.getAll({
    nama,
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
    await GroupService.getGroupById({
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

  const { status, status_code, message, data } = await GroupService.updateGroup(
    {
      id,
      nama,
    }
  );

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await GroupService.deleteGroup(
    {
      id,
    }
  );

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { create, getAll, getById, update, deleteById };
