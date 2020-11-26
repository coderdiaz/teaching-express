const express = require('express');
const router = express.Router();

// Routes Registry
router.use('/categories', require('./categories'));
router.use('/authors', require('./authors'));
router.use('/comments', require('./comments'));
router.use('/posts', require('./posts'));

module.exports = router;
