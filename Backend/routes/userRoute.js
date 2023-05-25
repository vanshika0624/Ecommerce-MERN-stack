const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  //updateUserRole,
  deleteUser,
  getAllSellers
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/getMyDetails").get(isAuthenticatedUser, getUserDetails);

router.route("/updateMyPassword").put(isAuthenticatedUser, updatePassword);

router.route("/updateMyDetails").put(isAuthenticatedUser, updateProfile);

//to get all seller details - can be used for filtering products
router.route("/getSellers").get(isAuthenticatedUser, getAllSellers);

//"admin" APIs
router.route("/getUsers").get(isAuthenticatedUser, getAllUser);


// need to confirm this api and remove one among this one and getMyDetails
router
  .route("/getUsers/:id")
  .get(isAuthenticatedUser, getSingleUser)
  .delete(isAuthenticatedUser, deleteUser);

module.exports = router;