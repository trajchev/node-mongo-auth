const express = require('express');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');

const router = express.Router();

// Set the route for signup, login and logout
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// The routes bellow are not publically accessible,
// so, we need to protect them
router.use(authController.protect);

// Get user profile info
router.get('/me', userController.getMe);

// Export the rouer for usage in external file
module.exports = router;