const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Prepare the user schema/model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
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
        required: [true, 'Please provide a password'],
        minlength: 12
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm password'],
        validate: {
            validator: function(passConfirm) {
                return passConfirm === this.password;
            },
            message: 'Password and Password Confirm do not match'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;