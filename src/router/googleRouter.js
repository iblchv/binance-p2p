const router = require('express').Router();
const controller = require('../controller/googleController');

router.get('/data/1', controller.getSheetData);
router.get('/updateP2P', controller.writeData);
router.get('/updateTickers', controller.writeTickerData);

module.exports = router;
