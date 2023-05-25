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

//Checkout
app.post(
  "/api/v1/checkout",
  authenticateUser,
  authorizeRoles("User", "Staff IT", "Manager IT"),
  checkoutController.create
);

app.get(
  "/api/v1/checkout",
  authenticateUser,
  authorizeRoles("User", "Staff IT", "Manager IT"),
  checkoutController.getAll
);

app.get(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles("User", "Staff IT", "Manager IT"),
  checkoutController.getById
);

app.put(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  checkoutController.update
);

app.delete(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  checkoutController.deleteById
);

app.put("/api/v1/statusWO/:id", authenticateUser, checkoutController.statusWO);

app.put(
  "/api/v1/statusPengerjaan/:id",
  authenticateUser,
  authorizeRoles("Manager IT"),
  checkoutController.statusPengerjaan
);

//User
app.post("/api/v1/auth/signin", authController.login);

app.post("/api/v1/auth/signup", authController.register);

app.get(
  "/api/v1/user",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  authController.getAll
);

app.get(
  "/api/v1/getAllApprove",
  authenticateUser,
  authorizeRoles("User", "Staff IT", "Manager IT"),
  authController.getAllApprove
);

app.get(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles("User", "Staff IT", "Manager IT"),
  authController.getById
);

app.put(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles("User", "Staff IT", "Manager IT"),
  authController.update
);

app.delete(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  authController.deleteById
);

//Departement
app.post(
  "/api/v1/departement",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  departementController.create
);

app.get(
  "/api/v1/departement",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  departementController.getAll
);

app.get(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  departementController.getById
);

app.put(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  departementController.update
);

app.delete(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  departementController.deleteById
);

//Group
app.post(
  "/api/v1/group",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  groupController.create
);

app.get(
  "/api/v1/group",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  groupController.getAll
);

app.get(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  groupController.getById
);

app.put(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles("Staff IT", "Manager IT"),
  groupController.update
);

app.delete(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles("Manager IT", "Staff IT"),
  groupController.deleteById
);

// Public File Access

app.listen(port, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${port}`);
});

module.exports = app;
