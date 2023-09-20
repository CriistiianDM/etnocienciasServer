const { Router, application } = require('express');
const { petitions_get , 
        petitions_newgdaycare ,
        petitions_uplannermoodle
} = require('../control/control');


const router = Router();


router.get('/', petitions_get);
router.get('/newgdaycare', petitions_newgdaycare);
router.post('/uplannermoodle', petitions_uplannermoodle);


module.exports = router;