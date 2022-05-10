const express = require('express');
const teamController = require('../controller/team.controller');

const router = express.Router();
router.post('/create-team',teamController.createTeam);
router.get('/view-team/:teamId',teamController.viewTeam);
router.get('/view-team-by-ownerId/:ownerId',teamController.viewTeamByOwnerId);
router.get('/view-team-list',teamController.viewTeamList);



module.exports = router;