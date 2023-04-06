const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
} = require("../utils");
const RefreshTokenRepository = require("../repositories/refreshTokenRepository");
const UsersRepository = require("../repositories/usersRepository");

const createUserRefreshToken = async (payload) => {
  try {
    const result = await RefreshTokenRepository.createRefreshToken(payload);

    return {
      status: true,
      status_code: 200,
      message: "Create Successfully",
      data: {
        result: result,
      },
    };
  } catch (error) {
    return {
      status: false,
      status_code: 500,
      message: error.message,
      data: {
        registered_user: null,
      },
    };
  }
};

const getUserRefreshToken = async (req) => {
  try {
    const { refreshToken } = req.params;

    const result = await RefreshTokenRepository.getRefreshToken({
      refreshToken,
    });

    const payload = isTokenValidRefreshToken({ token: result.refreshToken });

    const userCheck = await UsersRepository.getByEmail({
      email: payload.email,
    });

    const token = createJWT({ payload: createTokenUser(userCheck) });

    return {
      status: true,
      status_code: 200,
      message: "Get Successfully",
      data: {
        token: token,
      },
    };
  } catch (error) {
    console.log(error)
    return {
      status: false,
      status_code: 500,
      message: error.message,
      data: {
        registered_user: null,
      },
    };
  }
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
