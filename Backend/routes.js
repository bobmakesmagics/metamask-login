const express = require("express");

const router = express.Router();
const commonController = require("./controllers/common");
const walletController = require("./controllers/wallet");

router.get("/", commonController.healthcheck);
router.post("/wallet/nonce", walletController.nonce);

module.exports = router; // export to use in server.js
