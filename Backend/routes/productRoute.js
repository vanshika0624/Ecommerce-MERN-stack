const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getSellerProducts,
  getSellerSingleProduct
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/seller/createProduct")
  .post(isAuthenticatedUser, authorizeRoles("seller"), createProduct);

router
  .route("/seller/getProducts") 
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerProducts);

router
  .route("/seller/getProducts/:id")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerSingleProduct) 
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteProduct);


router.route("/getProducts").get(getAllProducts);

router.route("/getProducts/:id").get(getSingleProductDetails);

router.route("/createReview").put(isAuthenticatedUser, authorizeRoles("buyer"), createProductReview);

router
  .route("/getProductReviews")
  .get(getProductReviews);

router
.route("/seller/deleteReviews")
.delete(isAuthenticatedUser, authorizeRoles("seller"), deleteReview);

module.exports = router;