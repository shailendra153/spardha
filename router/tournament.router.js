const express = require('express');
const tournamentController = require('../controller/tournament.controller');

const router = express.Router();

router.post('/upload-tournament', tournamentController.uploadTournament);
router.get('view-tournament/:tournamentId', tournamentController.viewTournament);
router.get('view-tournament-by-organiserId/:organiserId', tournamentController.viewTournamentByOrganiserId);
router.get('/apply-for-tournament',tournamentController.applyForTournament);
router.get('/view-tournament',tournamentController.viewTournamentList);



module.exports = router;