const router = require("express").Router()
const authController = require("../controllers/authController")
const upload = require("../utils/fileUpload");

router.post("/auth/register", upload.single("picture"), authController.register);
router.post("/auth/login", authController.login);

module.exports = router