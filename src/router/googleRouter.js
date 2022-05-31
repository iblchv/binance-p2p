const router = require('express').Router();
const controller = require('../controller/googleController');

router.get('/data/1', controller.getSheetData);
router.get('/update', controller.writeData);

module.exports = router;
