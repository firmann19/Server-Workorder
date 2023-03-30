const express = require("express");
const { getRefreshTokenUser } = require("../controllers/refreshTokenController");


const router = express();

router.get("/refresh-token/:refreshToken", getRefreshTokenUser);

module.exports = router;
