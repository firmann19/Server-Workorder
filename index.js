const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = 7000;
const upload = require("./utils/fileUpload");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Import Controllers
const authController = require("./controllers/authController");
const checkoutController = require("./controllers/checkoutController")
const laporanController = require("./controllers/laporanController")

// Import Middlewares
const {authenticateUser, authorizeRoles} = require("./middlewares/auth")

// Define Routes

// Auth
app.post("/auth/register", upload.single("picture"), authController.register);
app.post("/auth/login", authController.login);

//Checkout
app.post("/checkout",authenticateUser, authorizeRoles("admin") ,checkoutController.create)
app.get("/checkout", authenticateUser, authorizeRoles("admin") ,checkoutController.getAll)
app.get("/checkout/:id", authenticateUser, authorizeRoles("admin") ,checkoutController.getCheckoutID)
app.put("/checkout/verifikasi", authenticateUser, authorizeRoles("admin") ,checkoutController.updateStatusCheckout)
app.delete("/checkout/:id", authenticateUser, authorizeRoles("admin") ,checkoutController.deleteCheckoutID)

//Laporan
app.post("/laporan", authenticateUser, authorizeRoles("admin") ,laporanController.create)
app.get("/laporan", authenticateUser, authorizeRoles("admin") ,laporanController.getAll)
app.get("/laporan/:id", authenticateUser, authorizeRoles("admin") ,laporanController.getLaporanID)
app.put("/laporan/diketahui", authenticateUser, authorizeRoles("admin") ,laporanController.updateStatusLaporan)
app.delete("/laporan/:id", authenticateUser, authorizeRoles("admin") ,laporanController.deleteLaporanID)

// Public File Access
app.use("/public/files", express.static(path.join(__dirname, "/storages")));

app.listen(port, () => {
  console.log(
    `Server berhasil berjalan di port http://localhost:${
      port
    }`
  );
});

module.exports = app;