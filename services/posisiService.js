const PosisiRepository = require("../repositories/posisiRepository");

class PosisiService {
  static async create({ jabatan }) {
    try {
      const createdPosisi = await PosisiRepository.create({
        jabatan,
      });

      return {
        status: true,
        status_code: 201,
        message: "created posisi successfully",
        data: {
          created_posisi: createdPosisi,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_posisi: null,
        },
      };
    }
  }

  static async getAll() {
    try {
      const getAllPosisi = await PosisiRepository.getAllPosisi({});

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_posisi: getAllPosisi,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_posisi: null,
        },
      };
    }
  }

  static async getPosisiById({ id }) {
    try {
      const getPosisiById = await PosisiRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getGroup_ById: getPosisiById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getPosisi_ById: null,
        },
      };
    }
  }

  static async updatePosisi({ id, jabatan }) {
    try {
      // Melakukan check terhadap email
      const Check = await PosisiRepository.getById({ id });

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

      const updatePosisi = await PosisiRepository.updatePosisi({
        id,
        jabatan,
      });

      return {
        status: true,
        status_code: 200,
        message: "update posisi successfully",
        data: {
          update_Posisi: updatePosisi,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_Posisi: null,
        },
      };
    }
  }

  static async deletePosisi({ id }) {
    try {
      const deletedPosisi = await PosisiRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "delete group successfully",
        data: {
          delete_Posisi: deletedPosisi,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_Posisi: null,
        },
      };
    }
  }
}

module.exports = PosisiService;
