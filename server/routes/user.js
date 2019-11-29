const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// Set the route for signup and login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Export the rouer for usage in external file
module.exports = router;