const express = require('express');
const adminController = require('../controller/admin.controller');
const router = express.Router();

router.post('/signin', adminController.adminSignin);
router.post('/signup', adminController.adminSignup);



module.exports = router;