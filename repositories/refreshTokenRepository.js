const { RefreshToken } = require("../models");

class RefreshTokenRepository {
  static async getRefreshToken({ refreshToken }) {
    const getRefreshTokenId = await RefreshToken.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
    return getRefreshTokenId;
  }

  static async createRefreshToken({ PenggunaId, refreshToken }) {
    const createdRefreshToken = RefreshToken.create({
      PenggunaId,
      refreshToken,
    });

    return createdRefreshToken;
  }
}

module.exports = RefreshTokenRepository;
