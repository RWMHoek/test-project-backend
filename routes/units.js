// Server Router for units

// Require controller
const { units } = require('../controllers');

// Set up router
const express = require('express');
const router = express.Router();

// Get all units
router.get('/', units.all);

// Export the router
module.exports = router;