const express = require('express');
require('dotenv').config();
const ingredientsRouter = require('./routes/ingredients');
const unitsRouter = require('./routes/units');
const categoriesRouter = require('./routes/categories');
const cors = require('cors');
const morgan = require('morgan');

// Setup server
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(morgan('dev'));

app.use(express.json());

// Route middlewares
app.use('/ingredients', ingredientsRouter);
app.use('/units', unitsRouter);
app.use('/categories', categoriesRouter);

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});