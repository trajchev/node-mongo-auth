const jwt = require('jsonwebtoken');

// Sign the token with a unique piece of info for user example the user id
const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME
});

const createSendToken = (user, statusCode, req, res) => {
    
    // User's id in MongoDB is created as _id
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRATION_TIME ),
        httpOnly: true,
        // set secure cookies: if communicating via TLS connection (http://expressjs.com/en/api.html#req.secure) ||
        // if header XFP is https (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto)
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    // Hide password when returning to user
    user.password = null;

    // Set the status code and send the response
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });

};

module.exports = createSendToken;