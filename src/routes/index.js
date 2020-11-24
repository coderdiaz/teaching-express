const express = require('express');
const router = express.Router();

// Routes Registry
router.use('/categories', require('./categories'));
router.use('/authors', require('./authors'));

module.exports = router;
