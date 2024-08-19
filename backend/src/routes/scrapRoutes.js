const express = require('express');
const { list_form_scrap } = require('../controllers/scrapController');

const router = express.Router();

router.post('/list_form_scrap', list_form_scrap);

module.exports = router;
