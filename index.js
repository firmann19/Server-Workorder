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

// Define Routes

// Auth
app.post("/auth/register", upload.single("picture"), authController.register);
app.post("/auth/login", authController.login);

//Checkout
app.post("/checkout", checkoutController.create)
app.get("/checkout", checkoutController.getAll)
app.get("/checkout/:id", checkoutController.getCheckoutID)
app.put("/checkout/verifikasi", checkoutController.updateStatusCheckout)
app.delete("/checkout/:id", checkoutController.deleteByID)


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