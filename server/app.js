const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-errors');

const app = express();
const petshopRouter = require('./app/routes/petshop.route');

app.use(cors());
app.use(express.json());
app.use('/api/petshop', petshopRouter);
// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
