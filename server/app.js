const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const userRouter = require('./routes/user');


// Start the express app
const app = express();

// Limit the JSON response size to 10kb
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

// Cookie parser
app.use(cookieParser()); 

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount the routes
app.use('/api/v1/users', userRouter);

module.exports = app;