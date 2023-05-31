const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getAllBuyerOrders,
  getAllSellerOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, authorizeRoles("buyer"), newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/getAllMyOrders").get(isAuthenticatedUser, authorizeRoles("buyer"), getAllBuyerOrders);

router
  .route("/seller/getAllMyOrders")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getAllSellerOrders);

router
  .route("/seller/getAllMyOrders/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteOrder);

module.exports = router;