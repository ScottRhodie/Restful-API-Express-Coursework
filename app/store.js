const mongoose = require('mongoose');
const User = require('./model');

module.exports = ({
    url
}) => {
    return mongoose.connect(url, {
        useNewUrlParser: true
    }).then(() => {
        return {
            saveUser: (user) => {
                console.log("A new user has been created.")
                return User.create(user)
            }
        }
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
};