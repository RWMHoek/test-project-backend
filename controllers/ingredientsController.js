const pool = require('../models/database');

/* get all ingredients from the database
*  to be used in a call to app.get('/')
*/
const allIngredients = async (req, res) => {
    try {
        const ingredients = await pool.query(
            'SELECT ingredients.id as id, ingredients.name as name, unit_id, units.name as unit, category_id, categories.name as category FROM ingredients JOIN units ON ingredients.unit_id = units.id JOIN categories ON ingredients.category_id = categories.id ORDER BY 2');
        res.status(200).json(ingredients.rows);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

/* Find and send specified ingredient in response
*  Id param already parsed and attached to request
*/
const ingredientById = async (req, res) => {
    try {
        const ingredient = await pool.query(
            'SELECT ingredients.id as id, ingredients.name as name, unit_id, units.name as unit, category_id, categories.name as category FROM ingredients JOIN units ON ingredients.unit_id = units.id JOIN categories ON ingredients.category_id = categories.id WHERE ingredients.id = $1',
            [req.id]
        );
        res.status(200).json(ingredient.rows[0]);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

/* Delete specified ingredient
*  Id param already parsed and attached to request
*/
const deleteIngredient = async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM ingredients WHERE id = $1',
            [req.id]
        );
        res.status(204).send(`Successfully deleted ingredient with id ${req.id}`);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

/* Create new ingredient
*  To be used in a call to app.post('/')
*/
const createIngredient = async (req, res) => {
    const ingredient = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ingredients (name, unit_id, category_id) VALUES ($1, $2, $3) RETURNING id',
            [ingredient.name, ingredient.unit_id, ingredient.category_id]
        );
        res.status(201).json(result.rows);
    } catch (error) {
        res.status(400).json({error});
    }
};

/* Update existing ingredient
*  To be used in a call to app.put('/:id')
*  Id param already attached to the request
*/
const updateIngredient = async (req, res) => {
    const ingredient = req.body;
    try {
        const result = await pool.query(
            'UPDATE ingredients SET name = $1, unit_id = $2, category_id = $3 WHERE id = $4 RETURNING id',
            [ingredient.name, ingredient.unit_id, ingredient.category_id, req.id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = {
    all: allIngredients,
    byId: ingredientById,
    create: createIngredient,
    update: updateIngredient,
    delete: deleteIngredient
};