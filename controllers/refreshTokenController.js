const refreshTokenService = require("../services/refreshTokenService");

const getRefreshTokenUser = async (req, res, next) => {
  const { refreshToken } = req.params;

  const { status, status_code, message, data } =
    await refreshTokenService.getUserRefreshToken({
      refreshToken,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getRefreshTokenUser };
