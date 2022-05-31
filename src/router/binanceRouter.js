const router = require('express').Router();
const controller = require('../controller/binanceController');

router.get('/getAll', controller.getAllData);

module.exports = router;
