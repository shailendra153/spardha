const express = require('express');
const organiserController = require('../controller/organiser.controller');



const router = express.Router();
router.post('/signup', organiserController.organiserSignup);
router.post('/signin', organiserController.organiserSignin);




module.exports = router;