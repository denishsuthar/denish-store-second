const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../conrollers/paymentController");
const router = express.Router();
const { isAuthenticUser } = require("../middelware/auth");

router.route("/payment/process").post(isAuthenticUser, processPayment);

router.route("/stripeapikey").get(isAuthenticUser, sendStripeApiKey);

module.exports = router;
