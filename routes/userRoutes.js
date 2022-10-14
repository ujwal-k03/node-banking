const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.user_register);
router.get('/register', userController.user_register_form);

module.exports = router;