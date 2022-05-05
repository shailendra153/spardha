const express = require('express');
const adminController = require('../controller/admin.controller');
const router = express.Router();

router.post('/signin', adminController.adminSignin);
router.post('/signup', adminController.adminSignup);
router.post('/signup-with-google', adminController.googleSignIn);
router.post('/viewProfile', adminController.viewProfile);
router.post('/update-profile', adminController.viewProfile);





module.exports = router;