const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);