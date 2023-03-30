const checkoutController = require("../controllers/checkoutController");
const authentication = require("../middlewares/auth");
const authorizationRoles = require("../middlewares/auth");
const router = require("express").Router();

//Checkout
router.use("/products", authorizationRoles);

router.post(
  "/checkout",
  authentication,
  checkoutController.create
);
router.get(
  "/checkout",
  authentication,
  checkoutController.getAll
);
router.get(
  "/checkout/:id",
  authentication,
  checkoutController.getCheckoutID
);
router.put(
  "/checkout/verifikasi",
  authentication,
  checkoutController.updateStatusCheckout
);
router.delete(
  "/checkout/:id",
  authentication,
  checkoutController.deleteCheckoutID
);

module.exports = router