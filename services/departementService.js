const DepartementRepository = require("../repositories/departementRepository");

class DepartementService {
  static async create({ nama }) {
    try {
      const createdDepartement = await DepartementRepository.create({
        nama,
      });

      return {
        status: true,
        status_code: 201,
        message: "create Departement successfully",
        data: {
          created_departement: createdDepartement,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_departement: null,
        },
      };
    }
  }

  static async getAll() {
    try {
      const getAllDepartement = await DepartementRepository.getAllDepartement({
        
      });

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_departement: getAllDepartement,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_departement: null,
        },
      };
    }
  }

  static async getDepartementById({ id }) {
    try {
      const getDepartementById = await DepartementRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getDepartement_ById: getDepartementById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getDepartement_ById: null,
        },
      };
    }
  }

  static async updateDepartement({ id, nama }) {
    try {
      // Melakukan check terhadap email
      const Check = await DepartementRepository.getById({ id });

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

      const updateDepartement = await DepartementRepository.updateDepartement({
        id,
        nama,
      });

      return {
        status: true,
        status_code: 200,
        message: "update departement successfully",
        data: {
          update_Departement: updateDepartement,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_Departement: null,
        },
      };
    }
  }

  static async deleteDepartement({ id }) {
    try {
      const deletedDepartement = await DepartementRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "delete departement successfully",
        data: {
          delete_Departement: deletedDepartement,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_Departement: null,
        },
      };
    }
  }
}

module.exports = DepartementService;
