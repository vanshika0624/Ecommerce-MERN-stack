const express = require("express");
 const {
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
  myCart,
} = require("../controllers/cartController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// router.route("/addproduct")
// .post(isAuthenticatedUser,authorizeRoles("buyer"), addCartProduct)
// .put(isAuthenticatedUser, authorizeRoles("buyer"), updateCartProduct);

// router.route("/removeproduct").delete(isAuthenticatedUser, authorizeRoles("buyer"),deleteCartProduct);

// router.route("/details").get(isAuthenticatedUser,authorizeRoles("buyer"), myCart);


module.exports = router;