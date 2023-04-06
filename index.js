const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
var logger = require("morgan");
const port = 7000;
const app = express();

// Import router
const authRouter = require("./router/userRouter");
const checkoutController = require("./controllers/checkoutController");
const laporanController = require("./controllers/laporanController");
const refreshTokenRouter = require("./router/refreshTokenRouter")

// membuat variabel v1
const v1 = "/api/v1";

// Import Middlewares
const { authenticateUser, authorizeRoles } = require("./middlewares/auth");

app.use(cors())
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/public")));

// gunakan categories router
app.use(`${v1}`, authRouter);
app.use(`${v1}`, refreshTokenRouter)

//Checkout
app.post(
  "/api/v1/checkout",
  authenticateUser,
  checkoutController.create
);
app.get(
  "/api/v1/checkout",
  authenticateUser,
  authorizeRoles("admin"),
  checkoutController.getAll
);
app.get(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles("admin"),
  checkoutController.getCheckoutID
);
app.put(
  "/api/v1/checkout/verifikasi",
  authenticateUser,
  authorizeRoles("admin"),
  checkoutController.updateStatusCheckout
);
app.delete(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles("admin"),
  checkoutController.deleteCheckoutID
);

//Laporan
app.post(
  "/api/v1/laporan",
  authenticateUser,
  authorizeRoles("admin"),
  laporanController.create
);
app.get(
  "/api/v1/laporan",
  authenticateUser,
  authorizeRoles("admin"),
  laporanController.getAll
);
app.get(
  "/api/v1/laporan/:id",
  authenticateUser,
  authorizeRoles("admin"),
  laporanController.getLaporanID
);
app.put(
  "/api/v1/laporan/diketahui",
  authenticateUser,
  authorizeRoles("admin"),
  laporanController.updateStatusLaporan
);
app.delete(
  "/api/v1/laporan/:id",
  authenticateUser,
  authorizeRoles("admin"),
  laporanController.deleteLaporanID
);

// Public File Access

app.listen(port, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${port}`);
});

module.exports = app;
