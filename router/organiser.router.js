const express = require('express');
const organiserController = require('../controller/organiser.controller');



const router = express.Router();
router.post('/signup', organiserController.organiserSignup);
router.post('/signin', organiserController.organiserSignin);
router.get('/verify/:organiserId',organiserController.verifyAccount);
router.post('/signin-with-google', organiserController.signinWithGoogle);
router.post('/update-profile', organiserController.updateProfile);
router.get('/view-profile/:organiserId', organiserController.viewProfile);
router.get('/view-organiser-list',organiserController.viewOrganiserList)

module.exports = router;