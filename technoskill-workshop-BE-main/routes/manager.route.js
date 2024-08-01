const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.post("/login", managerController.login);
router.post("/register", managerController.register);
router.post("/edit", managerController.editInformation);
router.post("/forgot-password", managerController.forgotPassword);
router.post("/generate-otp", managerController.genOTP);
router.post("/verify-otp", managerController.verOTP);

module.exports = router;
