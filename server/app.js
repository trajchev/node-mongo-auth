const express = require('express');
const morgan = require('morgan');


// Start the express app
const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

module.exports = app;