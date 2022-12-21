const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../conrollers/orderController");
const router = express.Router();

const { isAuthenticUser, authorizeRoles } = require("../middelware/auth");

router.route("/order/new").post(isAuthenticUser, newOrder);

router.route("/order/:id").get(isAuthenticUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticUser, myOrders);

router.route("/admin/orders").get(isAuthenticUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticUser, authorizeRoles("admin"),updateOrder).delete(isAuthenticUser, authorizeRoles("admin"),deleteOrder);

module.exports = router;