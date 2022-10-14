const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/new',transactionController.transactionform);
router.get('/withdraw',transactionController.withdrawform);
router.get('/deposit',transactionController.depositform);
router.get('/',transactionController.home);


router.post('/deposit',transactionController.depositpost);
router.post('/new',transactionController.transactionpost);
router.post('/withdraw',transactionController.withdrawpost);
router.post('/history',transactionController.history);

module.exports = router;