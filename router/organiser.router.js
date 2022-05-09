const express = require('express');
const organiserController = require('../controller/organiser.controller');



const router = express.Router();
router.post('/signup', organiserController.organiserSignup);
router.post('/signin', organiserController.organiserSignin);
router.get('/verify/:organiserId',organiserController.verifyAccount)
router.get('/signin-with-google', organiserController.signinWithGoogle)
router.post('/update-profile', organiserController.updateProfile)
router.post('/view-profile', organiserController.viewProfile)
router.post('/upload-tournament',organiserController.uploadTournament)






module.exports = router;