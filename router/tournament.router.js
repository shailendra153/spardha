const express = require('express');
const tournamentController = require('../controller/tournament.controller');
const multer = require('multer');
const { request } = require('express');
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (request, file, cb) => {
        cb(null, true)
    }

})


const router = express.Router();

router.post('/upload-tournament', upload.single('banner'), tournamentController.uploadTournament);
router.get('/view-tournament/:tournamentId', tournamentController.viewTournament);
router.get('view-tournament-by-organiserId/:organiserId', tournamentController.viewTournamentByOrganiserId);
router.post('/apply-for-tournament',tournamentController.applyForTournament);
router.get('/view-tournament',tournamentController.viewTournamentList);



module.exports = router;