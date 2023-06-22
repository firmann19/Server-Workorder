const ChangeSparepartRepository = require("../repositories/changeSparepart");
const { ApproveSparepart } = require("./mail");

class ChangeSparepartService {
  static async create({
    userRequestWo,
    departementUser,
    namaSparepart,
    harga,
    jumlahOrder,
    alasan,
    statusPengajuan,
    HeadIT,
  }) {
    try {
      const getEmail = await ChangeSparepartRepository.getEmailHeadIT({
        HeadIT,
      });

      const createdChangeSparepart = await ChangeSparepartRepository.create({
        userRequestWo,
        departementUser,
        namaSparepart,
        harga,
        jumlahOrder,
        alasan,
        statusPengajuan,
        HeadIT,
      });

      await ApproveSparepart(getEmail, createdChangeSparepart);

      return {
        status: true,
        status_code: 201,
        message: "create ChangeSparepart successfully",
        data: {
          created_ChangeSparepart: createdChangeSparepart,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          created_ChangeSparepart: null,
        },
      };
    }
  }

  static async getAll() {
    try {
      const getAllChangeSparepart =
        await ChangeSparepartRepository.getAllChangeSparepart({});

      return {
        status: true,
        status_code: 200,
        message: "Get All successfully",
        data: {
          getAll_ChangeSparepart: getAllChangeSparepart,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getAll_ChangeSparepart: null,
        },
      };
    }
  }

  static async getChangeSparepartById({ id }) {
    try {
      const getChangeSparepartById = await ChangeSparepartRepository.getById({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Get By Id successfully",
        data: {
          getChangeSparepart_ById: getChangeSparepartById,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          getChangeSparepart_ById: null,
        },
      };
    }
  }

  static async updateChangeSparepart({
    id,
    userRequestWo,
    departementUser,
    namaSparepart,
    harga,
    jumlahOrder,
    alasan,
    statusPengajuan,
    HeadIT,
  }) {
    try {
      // Melakukan check terhadap email
      const Check = await ChangeSparepartRepository.getById({ id });

      // Jika input Id salah, maka akan memberikan message "id salah"
      if (!Check) {
        return {
          status: false,
          status_code: 400,
          message: "Id Salah",
          data: {
            user_Id: null,
          },
        };
      }

      const updateChangeSparepart =
        await ChangeSparepartRepository.updateChangeSparepart({
          id,
          userRequestWo,
          departementUser,
          namaSparepart,
          harga,
          jumlahOrder,
          alasan,
          statusPengajuan,
          HeadIT,
        });

      return {
        status: true,
        status_code: 200,
        message: "update changeSparepart successfully",
        data: {
          update_ChangeSparepart: updateChangeSparepart,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          update_ChangeSparepart: null,
        },
      };
    }
  }

  static async deleteChangeSparepart({ id }) {
    try {
      const deletedChangeSparepart = await ChangeSparepartRepository.deleteById(
        {
          id,
        }
      );

      return {
        status: true,
        status_code: 200,
        message: "delete changeSparepart successfully",
        data: {
          delete_ChangeSparepart: deletedChangeSparepart,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          delete_ChangeSparepart: null,
        },
      };
    }
  }

  static async changeStatusPengajuan({ id, statusPengajuan }) {
    try {
      const statusPengajuanSparepart =
        await ChangeSparepartRepository.updateStatus({
          id,
          statusPengajuan,
        });

      return {
        status: true,
        status_code: 200,
        message: "status Pengerjaan successfully",
        data: {
          status_PengajuanSparepart: statusPengajuanSparepart,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          statusPengajuanSparepart: null,
        },
      };
    }
  }
}

module.exports = ChangeSparepartService;
