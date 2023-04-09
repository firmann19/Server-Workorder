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
const departementController = require("./controllers/departementController")
const groupController = require("./controllers/groupController")

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

//Departement
app.post(
  "/api/v1/departement",
  departementController.create
);

app.get(
  "/api/v1/departement",
  departementController.getAll
)

app.get(
  "/api/v1/departement/:id",
  departementController.getById
)

app.put(
  "/api/v1/departement/:id",
  departementController.update
)

app.delete(
  "/api/v1/departement/:id",
  departementController.deleteById
)

//Group
app.post(
  "/api/v1/group",
  groupController.create
);

app.get(
  "/api/v1/group",
  groupController.getAll
)

app.get(
  "/api/v1/group/:id",
  groupController.getById
)

app.put(
  "/api/v1/group/:id",
  groupController.update
)

app.delete(
  "/api/v1/group/:id",
  groupController.deleteById
)

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

// Public File Access

app.listen(port, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${port}`);
});

module.exports = app;
