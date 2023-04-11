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
app.post("/api/v1/checkout", checkoutController.create);

app.get("/api/v1/checkout", checkoutController.getAll);

app.get("/api/v1/checkout/:id", checkoutController.getById);

app.put("/api/v1/checkout/:id", checkoutController.update);

app.delete("/api/v1/checkout/:id", checkoutController.deleteById);

//User
app.post("/api/v1/auth/signin", authController.login);

app.post("/api/v1/auth/signup", authController.register);

app.get("/api/v1/user", authController.getAll);

app.get("/api/v1/user/:id", authController.getById);

app.put("/api/v1/user/:id", authController.update);

app.delete("/api/v1/user/:id", authController.deleteById);

//Departement
app.post("/api/v1/departement", departementController.create);

app.get("/api/v1/departement", departementController.getAll);

app.get("/api/v1/departement/:id", departementController.getById);

app.put("/api/v1/departement/:id", departementController.update);

app.delete("/api/v1/departement/:id", departementController.deleteById);

//Group
app.post("/api/v1/group", groupController.create);

app.get("/api/v1/group", groupController.getAll);

app.get("/api/v1/group/:id", groupController.getById);

app.put("/api/v1/group/:id", groupController.update);

app.delete("/api/v1/group/:id", groupController.deleteById);

//Peralatan
app.post("/api/v1/peralatan", peralatanController.create);

app.get("/api/v1/peralatan", peralatanController.getAll);

app.get("/api/v1/peralatan/:id", peralatanController.getById);

app.put("/api/v1/peralatan/:id", peralatanController.update);

app.delete("/api/v1/peralatan/:id", peralatanController.deleteById) /
  // Public File Access

  app.listen(port, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${port}`);
  });

module.exports = app;
