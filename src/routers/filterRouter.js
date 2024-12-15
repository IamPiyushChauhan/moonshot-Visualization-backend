const express = require('express');
const {getFilteredData, getFilteredDataFeature}  = require('../controller/filterService');
const router = express.Router();

router.get('/filter-data', getFilteredData);
router.get('/filter-data/byfeature', getFilteredDataFeature);

module.exports = router;
