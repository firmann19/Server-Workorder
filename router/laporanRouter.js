const laporanController = require("../controllers/laporanController");
const authentication = require("../middlewares/auth");
const authorizationRoles = require("../middlewares/auth");
const router = require("express").Router();

//Laporan
router.post(
  "/laporan",
  authentication,
  authorizationRoles("admin"),
  laporanController.create
);
router.get(
  "/laporan",
  authentication,
  authorizationRoles("admin"),
  laporanController.getAll
);
app.get(
  "/laporan/:id",
  authentication,
  authorizationRoles("admin"),
  laporanController.getLaporanID
);
app.put(
  "/laporan/diketahui",
  authentication,
  authorizationRoles("admin"),
  laporanController.updateStatusLaporan
);
app.delete(
  "/laporan/:id",
  authentication,
  authorizationRoles("admin"),
  laporanController.deleteLaporanID
);

module.exports = router