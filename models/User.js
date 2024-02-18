const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        minLength: [10, 'email should be at least 10 characters long']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [4, 'password should be at least 4 characters long']
    },
    stonesAdded: {
        type: mongoose.Types.ObjectId,
        ref: 'Stones',
    },
    likeStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stones',
    }],
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10) ;
});

const User = mongoose.model('User', userSchema);

module.exports = User;