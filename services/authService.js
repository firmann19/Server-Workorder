const usersRepository = require("../repositories/usersRepository");
const { createJWT, createRefreshJWT } = require("../utils/jwt");
const { createTokenUser } = require("../utils/createTokenUser");
const bcrypt = require("bcrypt");
const { createUserRefreshToken } = require("./refreshTokenService");

const SALT_ROUND = 10;

class AuthService {
  static async register({
    name,
    email,
    position,
    departement,
    password,
    role,
    picture,
  }) {
    try {
      // Payload Validation
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!role) {
        return {
          status: false,
          status_code: 400,
          message: "Role wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!picture) {
        return {
          status: false,
          status_code: 400,
          message: "Gambar wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!position) {
        return {
          status: false,
          status_code: 400,
          message: "Posisi wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!departement) {
        return {
          status: false,
          status_code: 400,
          message: "departement wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password minimal 8 karakter",
          data: {
            registered_user: null,
          },
        };
      }

      const getUserByEmail = await usersRepository.getByEmail({ email });

      if (getUserByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email sudah digunakan",
          data: {
            registered_user: null,
          },
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const createdUser = await usersRepository.create({
          name,
          email,
          position,
          departement,
          password: hashedPassword,
          role,
          picture,
        });

        return {
          status: true,
          status_code: 201,
          message: "Berhasil mendaftarkan user",
          data: {
            registered_user: createdUser,
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async login({ email, password }) {
    try {
      // Payload Validation
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password minimal 8 karakter",
          data: {
            registered_user: null,
          },
        };
      }

      const getUser = await usersRepository.getByEmail({ email });

      if (!getUser) {
        return {
          status: false,
          status_code: 404,
          message: "Email belum terdaftar",
          data: {
            user: null,
          },
        };
      } 
       

        const token = createJWT({ payload: createTokenUser(getUser) });

        const refreshToken = createRefreshJWT({payload: createTokenUser(getUser)});
        await createUserRefreshToken({refreshToken, user: getUser.id})

        return {
          status: true,
          status_code: 200,
          message: "User berhasil login",
          data: {
            token,
            refreshToken
          },
        };
     
    } catch (err) {
      console.log(err);
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = AuthService;
