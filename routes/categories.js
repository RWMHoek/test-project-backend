// Server routes for categories

// Require controller
const { categories } = require('../controllers');

// Set up router
const express = require('express');
const router = express.Router();

// Get all categories
router.get('/', categories.all);

// Export the router
module.exports = router;