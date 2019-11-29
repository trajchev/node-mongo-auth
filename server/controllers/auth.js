const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const createSendToken = require('../utils/createSendToken');


// Create User
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

// Login User
const login = catchAsync( async (req, res, next) => {

    // Get the email and password from the request body
    const { email, password } = req.body;

    // Check if user provided email and password for loging in
    if ( !email || !password ) {
        // Return an error if no email and/or password provided
        return next( new  Error('Please provide email and password!', 400));
    }

    // Check if we have given email in DB and if password for email is correct
    const user = await User.findOne({email}).select('+password');

    // Check if no user with that email was found or the provided password was incorrect
    if (!user || !( await user.passwordsMatch(password, user.password))) {

        // Return an error if the email or password were incorrect
        return next(new Error('Incorrect email or password', 401));

    }

    // If everything is correct send token for future auth of requests from user
    createSendToken(user, 200, req, res);
 
});

module.exports = { 
    register,
    login
};