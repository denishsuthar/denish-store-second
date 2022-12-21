const express = require("express");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} = require("../conrollers/userController");
const { isAuthenticUser, authorizeRoles } = require("../middelware/auth");
const { route } = require("./productRoute");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticUser, getUserDetails);

router.route("/password/update").put(isAuthenticUser, updatePassword);

router.route("/me/update").put(isAuthenticUser, updateProfile);

router.route("/admin/users").get(isAuthenticUser, authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id").get(isAuthenticUser, authorizeRoles("admin"), getSingleUser).put(isAuthenticUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticUser, authorizeRoles("admin"), deleteUser);

module.exports = router;