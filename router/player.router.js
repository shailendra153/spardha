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
router.get('/verify/:playerId',playerController.verifyAccount)
router.post('/update-profile', upload.single("image"), playerController.updateProfile);
router.get('/view-profile/:playerId', playerController.viewProfile);
router.post('/signin-with-google', playerController.signinWithGoogle);
router.get('/request-player/:playerId/:teamId/:tournamentId', playerController.requestForJoin);
router.get('/accept-request/:playerId/:resquestId/:teamId/:tournamentId', playerController.acceptRequest);
router.get('/reject-request/:playerId/:resquestId', playerController.rejectRequest);
router.get('/view-players', playerController.viewAllPlayers);
router.post('/send-mail',playerController.mailSender);
router.post('/forgot-password',playerController.ForgotPassword);




module.exports = router;