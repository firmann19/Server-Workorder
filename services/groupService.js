const GroupRepository = require("../repositories/groupsRepository");

class DepartementService {
  static async create({ nama }) {
    try {
      const createdGroup = await GroupRepository.create({
        nama,
      });

      return {
        status: true,
        status_code: 201,
        message: "created group successfully",
        data: {
          created_group: createdGroup,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_group: null,
        },
      };
    }
  }

  static async getAll() {
    try {
      const getAllGroup = await GroupRepository.getAllGroup({
        
      });

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_group: getAllGroup,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_group: null,
        },
      };
    }
  }

  static async getGroupById({ id }) {
    try {
      const getGroupById = await GroupRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getGroup_ById: getGroupById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getGroup_ById: null,
        },
      };
    }
  }

  static async updateGroup({ id, nama }) {
    try {
      // Melakukan check terhadap email
      const Check = await GroupRepository.getById({ id });

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

      const updateGroup = await GroupRepository.updateGroup({
        id,
        nama,
      });

      return {
        status: true,
        status_code: 200,
        message: "update departement successfully",
        data: {
          update_Group: updateGroup,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_Group: null,
        },
      };
    }
  }

  static async deleteGroup({ id }) {
    try {
      const deletedGroup = await GroupRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "delete group successfully",
        data: {
          delete_Group: deletedGroup,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_Group: null,
        },
      };
    }
  }
}

module.exports = DepartementService;
