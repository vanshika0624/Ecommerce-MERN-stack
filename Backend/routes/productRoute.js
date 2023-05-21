const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getSellerProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/seller/createProduct")
  .post(createProduct);
  //.post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/seller/getProducts/:id")
  .get(getSellerProduct) // this will get single product without any counts and pagination
  .put(updateProduct)
  //.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(deleteProduct);
  //.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// this will get all products without any counts and pagination
router
  .route("/seller/getProducts") 
  .get(getAdminProducts);
  //.get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);


router.route("/getProducts").get(getAllProducts);

router.route("/getProducts/:id").get(getProductDetails);

router.route("/createReview").put(createProductReview);
//router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/getProductReviews")
  .get(getProductReviews);

router
.route("/seller/reviews")
.delete(deleteReview);
//.delete(isAuthenticatedUser, deleteReview);

module.exports = router;