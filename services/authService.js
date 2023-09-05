const usersRepository = require("../repositories/usersRepository");
const { createTokenUser, createJWT, createRefreshJWT } = require("../utils");
const { comparePassword } = require("../helpers/bcrypt");
const {
  User,
  Departement,
  Group,
  Role,
  Posisi,
  Checkout,
} = require("../models");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");
const { createUserRefreshToken } = require("./refreshToken");

module.exports = {
  signUp: async (req, res) => {
    const { name, email, posisiId, roles, password, DepartementId, GroupId } =
      req.body;

    //Cek kondisi
    if (!name) {
      throw new BadRequestError("Nama belum di input");
    } else if (!email) {
      throw new BadRequestError("Email belum di input");
    } else if (!posisiId) {
      throw new BadRequestError("Posisi belum di input");
    } else if (!roles) {
      throw new BadRequestError("Role belum di input");
    } else if (!password) {
      throw new BadRequestError("Password belum di input");
    } else if (!GroupId) {
      throw new BadRequestError("Group belum di input");
    } else if (!DepartementId) {
      throw new BadRequestError("Departement belum di input");
    }

    const createdUser = await User.create({
      name,
      email,
      posisiId,
      roles,
      password,
      DepartementId,
      GroupId,
    });

    return createdUser;
  },

  signIn: async (req) => {
    const { email, password } = req.body;

    //Cek kondisi password dan email
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const getUser = await usersRepository.getByEmail({ email });

    const getUserByRole = await usersRepository.getAllUser();

    const WorkOrder = await Checkout.count();

    const TotalUser = await User.count();

    const TotalDepartement = await Departement.count();

    const TotalGroup = await Group.count();

    const isPasswordCorrect = comparePassword(password, getUser.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    const token = createJWT({ payload: createTokenUser(getUser) });

    const refreshToken = createRefreshJWT({
      payload: createTokenUser(getUser),
    });

    return {
      token,
      refreshToken,
      user: getUser.name,
      departement: getUser.Departement.nama,
      departementId: getUser.DepartementId,
      id: getUser.id,
      role: getUser.Role.roleEmploye,
      idUser: getUser.id,
      getNameManager: (getUserByRole.name = "Firman"),
      getManager: (getUserByRole.id = 36),
      getCountWO: WorkOrder,
      getCountUser: TotalUser,
      getCountDepartement: TotalDepartement,
      getCountGroup: TotalGroup,
    };
  },

  getAllUser: async (req, res) => {
    const result = await User.findAll({
      include: [
        {
          model: Departement,
          attributes: ["nama", "id"],
        },
        {
          model: Group,
          attributes: ["nama", "id"],
        },
        {
          model: Role,
          attributes: ["roleEmploye", "id"],
        },
        {
          model: Posisi,
          attributes: ["jabatan", "id"],
        },
      ],
    });

    return result;
  },

  getAllApprove: async (req, res) => {
    const { DepartementId } = req.user;

    const getAllApproveUsers = await User.findAll({
      where: { DepartementId },
      include: [
        {
          model: Departement,
          attributes: ["nama", "id"],
        },
      ],
    });
    return getAllApproveUsers;
  },

  getOneUser: async (req, res) => {
    const { id } = req.params;

    const result = await User.findOne({
      where: { id },

      include: [
        {
          model: Departement,
          attribubtes: ["nama", "id"],
        },
        {
          model: Group,
          attribubtes: ["nama", "id"],
        },
        {
          model: Posisi,
          attribubtes: ["jabatan", "id"],
        },
        {
          model: Role,
          attribubtes: ["roleEmploye", "id"],
        },
      ],
    });

    if (!result) throw new NotFoundError(`Tidak ada User dengan id :  ${id}`);

    return result;
  },

  updateUser: async (req, res) => {
    const { id } = req.params;

    const { name, email, posisiId, roles, password, DepartementId, GroupId } =
      req.body;

    //Cek kondisi
    if (!name) {
      throw new BadRequestError("Nama belum di input");
    } else if (!email) {
      throw new BadRequestError("Email belum di input");
    } else if (!posisiId) {
      throw new BadRequestError("Posisi belum di input");
    } else if (!roles) {
      throw new BadRequestError("Role belum di input");
    } else if (!password) {
      throw new BadRequestError("Password belum di input");
    } else if (!GroupId) {
      throw new BadRequestError("Group belum di input");
    } else if (!DepartementId) {
      throw new BadRequestError("Departement belum di input");
    }

    const check = await User.findOne({ where: { id } });

    if (!check) throw new NotFoundError(`Tidak ada User dengan id :  ${id}`);

    const result = await User.update(
      {
        name,
        email,
        posisiId,
        roles,
        password,
        DepartementId,
        GroupId,
      },
      { where: { id } }
    );

    return result;
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    const result = await User.destroy({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada User dengan id :  ${id}`);

    return result;
  },
};
