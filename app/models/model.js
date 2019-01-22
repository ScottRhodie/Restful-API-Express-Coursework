const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    photo: String,
    likes: Number
});

module.exports = mongoose.model('User', UserSchema);