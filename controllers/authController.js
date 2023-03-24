const authService = require("../services/authService");

const register = async (req, res) => {
  const { name, email, position, departement, password, role } = req.body;

  const { status, status_code, message, data } = await authService.register({
    name,
    email,
    position,
    departement,
    password,
    role,
    picture: req.uploaded_picture,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, status_code, message, data } = await authService.login({
    email,
    password,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { register, login };
