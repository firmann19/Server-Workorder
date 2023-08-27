const { NotFoundError } = require("../errors");
const { UserRefreshToken, User } = require("../models");
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
} = require("../utils");

module.exports = {
createUserRefreshToken : async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
},

getUserRefreshToken : async (req) => {
  const { refreshToken } = req.params;

  //cek refreshToken User
  const result = await UserRefreshToken.findOne({ refreshToken });

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  //Apabila Refresh Token Valid maka akan di refresh
  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  //Melakukan cek terhadap user
  const userCheck = await User.findOne({ email: payload.email });

  //Apabila user ada, maka akan dibuatkan token baru
  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
},
}