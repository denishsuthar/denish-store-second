const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../conrollers/productcontroller");
const { isAuthenticUser, authorizeRoles } = require("../middelware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/product/new").post(isAuthenticUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id").put(isAuthenticUser, authorizeRoles("admin"), updateProduct).delete(isAuthenticUser, authorizeRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticUser, authorizeRoles("admin"), deleteReview);


module.exports = router