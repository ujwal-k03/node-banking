const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/register',authController.user_register_form)
router.post('/register',authController.user_register);

module.exports = router;
