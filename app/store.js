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
                return User.create(user)
                    .then((response) => {
                        console.log("A new user has been created."); // now this is true since we are in the "then" part
                        return response; // always do that in case the client calling this function is interested in the result from .create
                    })
            }
        }
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
};