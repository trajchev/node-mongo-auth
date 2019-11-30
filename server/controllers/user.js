const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

const getMe = catchAsync( async (req, res, next) => {

    // Get current user by id from user object
    // passed by middleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: 'success',
        user
    });


});

module.exports = { getMe }