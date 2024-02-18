const mongoose = require('mongoose');

const stonesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [2, 'name should be at least 2 characters long'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        minLength: [3, 'category should be at least 3 characters long'],
    },
    color: {
        type: String,
        required: [true, 'color is required'],
        minLength: [2, 'color should be at least 2 characters long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'image shout start with http:// or https://'],
    },
    location: {
        type: String,
        required: [true, 'location is required'],
        min: [5, 'location shoud be between 5 and 15 characters'],
        miax: [15, 'location shoud be between 5 and 15 characters'],
    },
    formula: {
        type: String,
        required: [true, 'formula is required'],
        min: [3, 'formula shoud be between 3 and 30 characters'],
        miax: [3, 'formula shoud be between 3 and 30 characters'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [10, 'description should be at least 10 characters long'],
    },
    createdAt: Date,
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

stonesSchema.pre('save', function () {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    };
});

const Stones = mongoose.model('Stones', stonesSchema);

module.exports = Stones;