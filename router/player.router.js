const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const playerController = require('../controller/player.controller');
const multer = require('multer');
const { request } = require('express');
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (request, file, cb) => {
        cb(null, true)
    }

})
router.post('/signin', playerController.playerSignin);
router.post('/signup', upload.single('image'), playerController.playerSignup);
router.post('/update-profile', playerController.updateProfile);
router.get('/view-profile/:playerId', playerController.viewProfile);
router.get('/signin-with-google', playerController.signinWithGoogle);
router.get('/view-tournaments', playerController.viewTournaments);
router.get('/request-player/:playerId/:teamId/:teamName',playerController.requestForJoin);
router.get('/accept-request/:playerId',playerController.acceptRequest);



module.exports = router;