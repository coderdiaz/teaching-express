const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication');

// Routes Registry
router.use('/auth', require('./auth'));
router.use('/categories', authenticate, require('./categories'));
router.use('/authors', authenticate, require('./authors'));
router.use('/comments', authenticate, require('./comments'));
router.use('/posts', authenticate, require('./posts'));

module.exports = router;
