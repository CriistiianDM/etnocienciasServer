const { Router, application } = require('express');
const { petitions_get , petitions_newgdaycare} = require('../control/control');


const router = Router();


router.get('/', petitions_get);
router.get('/newgdaycare', petitions_newgdaycare);


module.exports = router;