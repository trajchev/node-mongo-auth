const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const createSendToken = require('../utils/createSendToken');

const register = catchAsync( async (req, res, next) => {

    const user = await User.create({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Create the token with the user, status 201 (OK and resource created)
    createSendToken(user, 201, req, res);

});

module.exports = { 
    register 
};