const express = require('express');
const router = express.Router();

// Routes Registry
router.use('/categories', require('./categories'));

module.exports = router;
