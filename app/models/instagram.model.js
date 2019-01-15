const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    idnumber: Number,
    name: String,
    photo: String,
    likes: Number
});

module.exports = mongoose.model('User', UserSchema);