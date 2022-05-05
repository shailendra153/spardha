const express = require('express');
const teamController = require('../controller/team.controller');

const router = express.Router();
router.post('/create-team',teamController.createTeam);



module.exports = router;