const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.get('/',defaultController.home);

module.exports = router;