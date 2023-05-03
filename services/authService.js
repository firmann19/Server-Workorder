const UsersRepository = require("../repositories/usersRepository");
const { createTokenUser, createJWT } = require("../utils");
const { comparePassword } = require("../helpers/bcrypt");
const { User, Departement, Group } = require("../models");

const SALT_ROUND = 10;

class AuthService {
  static async register({
    name,
    email,
    posisi,
    roles,
    password,
    DepartementId,
    GroupId,
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

      if (!roles) {
        return {
          status: false,
          status_code: 400,
          message: "Role wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!posisi) {
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

      if (!DepartementId) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!GroupId) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
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

      const getUserByEmail = await UsersRepository.getByEmail({ email });

      if (getUserByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email sudah digunakan",
          data: {
            getUser_ByEmail: null,
          },
        };
      } else {
        const createdUser = await UsersRepository.create({
          name,
          email,
          password,
          posisi,
          roles,
          password,
          DepartementId,
          GroupId,
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
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
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
          message: "Email wajib diisi",
          data: {
            user: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password minimal 8 karakter",
          data: {
            user: null,
          },
        };
      }

      const getUser = await UsersRepository.getByEmail({ email });

      if (!getUser) {
        return {
          status: false,
          status_code: 404,
          message: "Email belum terdaftar",
          data: {
            user: null,
          },
        };
      } else if (!getUser.password) {
        return {
          status: false,
          status_code: 400,
          message: "Akun ini belum melakukan setup password.",
          data: {
            user: null,
          },
        };
      } else {
        const isPasswordMatch = comparePassword(password, getUser.password);

        if (isPasswordMatch) {
          const token = createJWT({ payload: createTokenUser(getUser) });

          return {
            status: true,
            status_code: 200,
            message: "User berhasil login",
            data: {
              token,
              user: getUser.name,
              email: getUser.email,
              departement: getUser.Departement.nama,
              departementId: getUser.DepartementId,
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          user: null,
        },
      };
    }
  }

  static async getAll({
    name,
    email,
    password,
    posisi,
    roles,
    DepartementId,
    GroupId,
  }) {
    try {
      const getAllUsers = await User.findAll({
        name,
        email,
        password,
        posisi,
        roles,
        DepartementId,
        GroupId,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_users: getAllUsers,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_users: null,
        },
      };
    }
  }

  static async getAllApproveUsers({ DepartementId }) {
    try {
      const getAllApproveUsers = await User.findAll({
        where: { DepartementId },
        include: [
          {
            model: Departement,
            attributes: ["nama", "id"],
          },
        ],
      });

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAllApprove_users: getAllApproveUsers,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAllApprove_users: null,
        },
      };
    }
  }

  static async getUserById({ id }) {
    try {
      const getUserById = await UsersRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getUser_ById: getUserById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getUser_ById: null,
        },
      };
    }
  }

  static async updateUser({
    id,
    name,
    email,
    posisi,
    roles,
    DepartementId,
    GroupId,
  }) {
    try {
      // Melakukan check terhadap email
      const Check = await UsersRepository.getById({ id });

      // Jika input Id salah, maka akan memberikan message "id salah"
      if (!Check) {
        return {
          status: false,
          status_code: 400,
          message: "Id Salah",
          data: {
            registered_user: null,
          },
        };
      }

      const updateUser = await UsersRepository.updateUser({
        id,
        name,
        email,
        posisi,
        roles,
        DepartementId,
        GroupId,
      });

      return {
        status: true,
        status_code: 200,
        message: "update departement successfully",
        data: {
          update_User: updateUser,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_User: null,
        },
      };
    }
  }

  static async deleteUser({ id }) {
    try {
      const deletedUser = await UsersRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "delete user successfully",
        data: {
          delete_User: deletedUser,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_User: null,
        },
      };
    }
  }
}

module.exports = AuthService;
