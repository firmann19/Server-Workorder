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
const peralatanController = require("./controllers/peralatanController");
const checkoutController = require("./controllers/checkoutController");

// Import Middlewares
const { authenticateUser, authorizeRoles } = require("./middlewares/auth");

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
  checkoutController.create
);

app.get(
  "/api/v1/checkout",
  authenticateUser,
  authorizeRoles,
  checkoutController.getAll
);

app.get(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles,
  checkoutController.getById
);

app.put(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles,
  checkoutController.update
);

app.delete(
  "/api/v1/checkout/:id",
  authenticateUser,
  authorizeRoles,
  checkoutController.deleteById
);

//User
app.post("/api/v1/auth/signin", authController.login);

app.post("/api/v1/auth/signup", authController.register);

app.get("/api/v1/user", authenticateUser, authController.getAll);

app.get("/api/v1/check-user", authenticateUser, authController.getAllUserByDepartementId);

app.get("/api/v1/userApproved", authenticateUser, authController.getAllApproved)

app.get("/api/v1/user/:id", authenticateUser, authController.getById);

app.put(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles,
  authController.update
);

app.delete(
  "/api/v1/user/:id",
  authenticateUser,
  authorizeRoles,
  authController.deleteById
);

//Departement
app.post(
  "/api/v1/departement",
  authenticateUser,
  authorizeRoles,
  departementController.create
);

app.get(
  "/api/v1/departement",
  authenticateUser,
  authorizeRoles,
  departementController.getAll
);

app.get(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles,
  departementController.getById
);

app.put(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles,
  departementController.update
);

app.delete(
  "/api/v1/departement/:id",
  authenticateUser,
  authorizeRoles,
  departementController.deleteById
);

//Group
app.post(
  "/api/v1/group",
  authenticateUser,
  authorizeRoles,
  groupController.create
);

app.get(
  "/api/v1/group",
  authenticateUser,
  authorizeRoles,
  groupController.getAll
);

app.get(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles,
  groupController.getById
);

app.put(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles,
  groupController.update
);

app.delete(
  "/api/v1/group/:id",
  authenticateUser,
  authorizeRoles,
  groupController.deleteById
);

//Peralatan
app.post(
  "/api/v1/peralatan",
  authenticateUser,
  authorizeRoles,
  peralatanController.create
);

app.get(
  "/api/v1/peralatan",
  authenticateUser,
  authorizeRoles,
  peralatanController.getAll
);

app.get(
  "/api/v1/peralatan/:id",
  authenticateUser,
  authorizeRoles,
  peralatanController.getById
);

app.put(
  "/api/v1/peralatan/:id",
  authenticateUser,
  authorizeRoles,
  peralatanController.update
);

app.delete(
  "/api/v1/peralatan/:id",
  authenticateUser,
  authorizeRoles,
  peralatanController.deleteById
);
// Public File Access

app.listen(port, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${port}`);
});

module.exports = app;
