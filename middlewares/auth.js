const { ROLES } = require("../helpers/const");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    //check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      return res.status(401).send({
        status: false,
        message: "Authenticated Invalid",
        data: null,
      })
    }

    const payload = isTokenValid({ token });

    // Attach the user and his permissions to the req object
    req.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      posisi: payload.posisi,
      roles: payload.roles,
      DepartementId: payload.DepartementId,
      GroupId: payload.GroupId,
    };

    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const authorizeRoles = (req, res, next) => {
   const user = req.user;

   if(user.roles === ROLES.ADMIN) return next();

   return res.status(401).send({
    status: false,
    message: "Akun anda harus admin untuk mengakses resource ini.",
    data: null
   })
};

module.exports = { authenticateUser, authorizeRoles };
