const mongoose = require('mongoose');
const User = require('./model');

module.exports = ({
    url
}) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false
    }).then(() => {
        return {

            saveUser: (user) => {
                return User.create(user)
                    .then((response) => {
                        console.log("A new user has been created.");
                        return response;
                    })
            },

            findAllUsers: () => {
                return User.find()
                    .then((response) => {
                        console.log("Listing all users now...");
                        return response;
                    })
            },

            findSingleUser: (req, res) => {
                return User.findById(req.params.userId)
            },

            findUserByIdAndUpdate: (req) => {
                return User.findByIdAndUpdate(req.params.userId, {
                    name: req.body.name,
                    photo: req.body.photo,
                    likes: req.body.likes
                }, {
                    new: true
                })
            }

        }
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
};