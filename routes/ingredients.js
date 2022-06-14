/* Server Router for ingredients
*/

// Require controller
const { ingredients } = require('../controllers');

//set up router
const express = require('express');
const router = express.Router();

// Extract id from params
router.param('id', (req, res, next, id) => {
    try {
        req.id = parseInt(id);
        next();
    } catch (error) {
        res.status(400).send('Invalid id - Likely NaN');
    }
});

// Get all ingredients
router.get('/', ingredients.all);

// Get ingredient by id
router.get('/:id', ingredients.byId);

// Create new ingredient
router.post('/', ingredients.create);

// Update an existing ingredient
router.put('/:id', ingredients.update);

// Delete specified ingredient
router.delete('/:id', ingredients.delete);

// Export the router
module.exports = router;