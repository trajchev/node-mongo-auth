const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Prepare the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    image: {
        type: String
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a password'],
        minlength: 12,
        select: false
    },
    passwordConfirm: {
        type: String,
        trim: true,
        required: [true, 'Please confirm password'],
        validate: {
            validator: function(passConfirm) {
                return passConfirm === this.password;
            },
            message: 'Password and Password Confirm do not match'
        },
        select: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

// Hash password using pre save hook
userSchema.pre('save', async function() {

    // hash the password before saving to DB
    this.password = await bcrypt.hash(this.password, 10);

    // Password was confirmed
    this.passwordConfirm = true;

});

// Define method for checking password for logging users in
userSchema.methods.passwordsMatch = async function( candidatePassword, userPassword ) {

    // Compare the hashed candidate password to the password in the DB
    return await bcrypt.compare(candidatePassword, userPassword);

};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;