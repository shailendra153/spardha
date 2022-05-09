const express = require('express');
const tournamentController = require('../controller/tournament.controller');

const router = express.Router();

router.post('/upload-tournament', tournamentController.uploadTournament);
router.get('view-tournament/:tournamentId', tournamentController.viewTournament);



module.exports = router;