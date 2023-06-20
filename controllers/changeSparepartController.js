const ChangeSparepartService = require("../services/changeSparepart");

const create = async (req, res, next) => {
  const {
    userRequestWo,
    departementUser,
    namaSparepart,
    harga,
    jumlahOrder,
    alasan,
    statusPengajuan,
    HeadIT,
  } = req.body;

  const { status, status_code, message, data } =
    await ChangeSparepartService.create({
      userRequestWo,
      departementUser,
      namaSparepart,
      harga,
      jumlahOrder,
      alasan,
      statusPengajuan,
      HeadIT,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAll = async (req, res, next) => {
  const {} = req.body;

  const { status, status_code, message, data } =
    await ChangeSparepartService.getAll({});

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await ChangeSparepartService.getChangeSparepartById({
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
    userRequestWo,
    departementUser,
    namaSparepart,
    harga,
    jumlahOrder,
    alasan,
    statusPengajuan,
    HeadIT,
  } = req.body;

  const { status, status_code, message, data } =
    await ChangeSparepartService.updateChangeSparepart({
      id,
      userRequestWo,
      departementUser,
      namaSparepart,
      harga,
      jumlahOrder,
      alasan,
      statusPengajuan,
      HeadIT,
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
    await ChangeSparepartService.deleteChangeSparepart({
      id,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const statusPengajuan = async (req, res, next) => {
  const { id } = req.params;
  const { statusPengajuan } = req.body;

  const { status, status_code, message, data } =
    await ChangeSparepartService.changeStatusPengajuan({
      id,
      statusPengajuan,
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
  deleteById,
  statusPengajuan,
};
