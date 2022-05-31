const router = require('express').Router();
const controller = require('../controller/googleController');

router.get('/data/1', controller.getSheetData);

module.exports = router;
