const pool = require('../models/database');

/* Get all categories from the database
*  To be used in a call to app.get('/')
*/
const allCategories = async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM categories');
        res.status(200).json(categories.rows);
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = {
    all: allCategories
};