const { Router, application } = require('express');
const { petitions_get } = require('../control/control');


const router = Router();


router.get('/:hojaCalculo', petitions_get);


module.exports = router;