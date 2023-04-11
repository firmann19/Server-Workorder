const PeralatanRepository = require("../repositories/peralatanRepository");

class PeralatanService {
  static async create({ namaPeralatan, kodePeralatan }) {
    try {
      const createdPeralatan = await PeralatanRepository.create({
        namaPeralatan,
        kodePeralatan,
      });

      return {
        status: true,
        status_code: 201,
        message: "Post created successfully",
        data: {
          created_peralatan: createdPeralatan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_peralatan: null,
        },
      };
    }
  }

  static async getAll({ namaPeralatan, kodePeralatan }) {
    try {
      const getAllPeralatan = await PeralatanRepository.getAllPeralatan({
        namaPeralatan,
        kodePeralatan,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get All Peralatan Success",
        data: {
          getAll_peralatan: getAllPeralatan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_peralatan: null,
        },
      };
    }
  }

  static async getPeralatanById({ id }) {
    try {
      const getPeralatanById = await PeralatanRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get Peralatan By Id Success",
        data: {
          getPeralatan_ById: getPeralatanById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getPeralatan_ById: null,
        },
      };
    }
  }

  static async updatePeralatan({ id, namaPeralatan, kodePeralatan }) {
    try {
      // Melakukan cek terhadap peralatan
      const Check = await PeralatanRepository.getById({ id });

      //Jika input Id salah, maka akan memberikan message "id salah"
      if (!Check) {
        return {
          status: false,
          status_code: 400,
          message: error.message,
          data: {
            update_peralatan: null,
          },
        };
      }

      const updatePeralatan = await PeralatanRepository.updatePeralatan({
        id,
        namaPeralatan,
        kodePeralatan,
      });

      return {
        status: true,
        status_code: 200,
        message: "Update Peralatan Success",
        data: {
          update_peralatan: updatePeralatan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_peralatan: null,
        },
      };
    }
  }

  static async deletePeralatan({ id }) {
    try {
      const deletePeralatan = await PeralatanRepository.deleteById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Delete peralatan successfully",
        data: {
          delete_peralatan: deletePeralatan,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_peralatan: null,
        },
      };
    }
  }
}

module.exports = PeralatanService;
