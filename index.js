const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
var logger = require("morgan");
const port = 7000;
const app = express();

// Import router
const authController = require("./controllers/authController");
const departementController = require("./controllers/departementController");
const groupController = require("./controllers/groupController");
const checkoutController = require("./controllers/checkoutController");
const posisiController = require("./controllers/posisiController");
const roleController = require("./controllers/roleController");
const changeSparepartController = require("./controllers/changeSparepartController");
const dashboardController = require("./controllers/DashboardController");


// Import Middlewares
const {
  authenticateUser,
  authorizeRoles,
  authorizeHeadIT,
} = require("./middlewares/auth");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

//ChangeSparepart
app.get(
  "/api/v1/count",
  //authenticateUser,
  //authorizeRoles("Staff IT", "Manager IT"),
  dashboardController.CountDocument
);

//ChangeSparepart
app.post(
  "/api/v1/changeSparepart",
  //authenticateUser,
  //authorizeRoles("Staff IT", "Manager IT"),
  changeSparepartController.create
);

app.get(
  "/api/v1/changeSparepart",
  authenticateUser,
  authorizeRoles(2, 3),
  changeSparepartController.getAll
);

app.get(
  "/api/v1/changeSparepart/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  changeSparepartController.getById
);

app.put(
  "/api/v1/changeSparepart/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  changeSparepartController.update
);

app.delete(
  "/api/v1/changeSparepart/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  changeSparepartController.deleteById
);

app.put(
  "/api/v1/changeStatus/:id",
  authenticateUser,
  authorizeRoles(3),
  changeSparepartController.statusPengajuan
);

//Checkout
app.post(
  "/api/v1/checkout",
  authenticateUser,
  authorizeRoles(1, 2, 3),
  checkoutController.create
);

app.get(
  "/api/v1/checkout",
  authenticateUser,
  authorizeRoles(1, 2, 3),
  checkoutController.getAll
);

app.get(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles(1, 2, 3),
  checkoutController.getById
);

app.put(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  checkoutController.update
);

app.delete(
  "/api/v1/checkout/:id",
  authenticateUser,
  checkoutController.deleteById
);

app.put("/api/v1/statusWO/:id", authenticateUser, checkoutController.statusWO);

app.put(
  "/api/v1/statusPengerjaan/:id",
  authenticateUser,
  authorizeRoles(2),
  checkoutController.statusPengerjaan
);

app.put(
  "/api/v1/statusProgress/:id",
  authenticateUser,
  authorizeRoles(3),
  checkoutController.statusProgressWO
);

//User
app.post("/api/v1/auth/signin", authController.login);

app.post("/api/v1/auth/signup", authController.register);

app.get(
  "/api/v1/user",
  authenticateUser,
  authorizeRoles(2, 3),
  authController.getAll
);

app.get(
  "/api/v1/getAllApprove",
  authenticateUser,
  authorizeRoles(1, 2, 3),
  authController.getAllApprove
);

app.get(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles(1, 2, 3),
  authController.getById
);

app.put(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles(1, 2, 3),
  authController.update
);

app.delete(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  authController.deleteById
);

//Departement
app.post(
  "/api/v1/departement",
  //authenticateUser,
  //authorizeRoles("Staff IT", "Manager IT"),
  departementController.create
);

app.get(
  "/api/v1/departement",
  authenticateUser,
  authorizeRoles(2, 3),
  departementController.getAll
);

app.get(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  departementController.getById
);

app.put(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  departementController.update
);

app.delete(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  departementController.deleteById
);

//Group
app.post(
  "/api/v1/group",
  //authenticateUser,
  //authorizeRoles("Staff IT", "Manager IT"),
  groupController.create
);

app.get(
  "/api/v1/group",
  authenticateUser,
  authorizeRoles(2, 3),
  groupController.getAll
);

app.get(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  groupController.getById
);

app.put(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles(2, 3),
  groupController.update
);

app.delete(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles(3, 2),
  groupController.deleteById
);

//Posisi
app.post("/api/v1/posisi", posisiController.create);

app.get("/api/v1/posisi", posisiController.getAll);

app.get("/api/v1/posisi/:id", posisiController.getById);

app.put("/api/v1/posisi/:id", posisiController.update);

app.delete("/api/v1/posisi/:id", posisiController.deleteById);

//Role
app.post("/api/v1/role", roleController.create);

app.get("/api/v1/role", roleController.getAll);

app.get("/api/v1/role/:id", roleController.getById);

app.put("/api/v1/role/:id", roleController.update);

app.delete("/api/v1/role/:id", roleController.deleteById);

// Public File Access

app.listen(port, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${port}`);
});

module.exports = app;
