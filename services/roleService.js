const RoleRepository = require("../repositories/rolesRepository");

class RoleService {
  static async create({ roleEmploye }) {
    try {
      const createdRole = await RoleRepository.create({
        roleEmploye,
      });

      return {
        status: true,
        status_code: 201,
        message: "created role successfully",
        data: {
          created_role: createdRole,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_role: null,
        },
      };
    }
  }

  static async getAll() {
    try {
      const getAllRole = await RoleRepository.getAllRole({});

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_Role: getAllRole,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_role: null,
        },
      };
    }
  }

  static async getRoleById({ id }) {
    try {
      const getRoleById = await RoleRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getRole_ById: getRoleById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getRole_ById: null,
        },
      };
    }
  }

  static async updateRole({ id }) {
    try {
      // Melakukan check terhadap email
      const Check = await RoleRepository.getById({ id });

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

      const updateRole = await RoleRepository.updateRole({
        id,
        roleEmploye,
      });

      return {
        status: true,
        status_code: 200,
        message: "update posisi successfully",
        data: {
          update_Role: updateRole,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_Role: null,
        },
      };
    }
  }

  static async deleteRole({ id }) {
    try {
      const deletedRole = await RoleRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "delete group successfully",
        data: {
          delete_Role: deletedRole,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_Role: null,
        },
      };
    }
  }
}

module.exports = RoleService;
