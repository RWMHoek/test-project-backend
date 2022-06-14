const pool = require('../models/database');

/* Get all units from the database
*  To be used in a call to app.get('/')
*/
const allUnits = async (req, res) => {
    try {
        const units = await pool.query('SELECT * FROM units');
        res.status(200).json(units.rows);
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = {
    all: allUnits
};