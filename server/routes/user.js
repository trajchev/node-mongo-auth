const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// Set the route for signup
router.post('/register', authController.register);

// Export the rouer for usage in external file
module.exports = router;