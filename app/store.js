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


            getAllUsers: () => {
                return User.find()
                    .then((response) => {
                        console.log("Listing all users now...");
                        return response;
                    })
            },


            findUser: (userId) => {
                return User.findById(userId.params.userId)
            },


            updateUser: (userId) => {
                return User.findByIdAndUpdate(userId.params.userId, {
                    name: userId.body.name,
                    avatar: userId.body.avatar,
                    photo: userId.body.photo,
                    photoCaption: userId.body.photoCaption,
                    likes: userId.body.likes
                }, {
                    new: true
                })
            },


            deleteUserById: (userId) => {
                return User.findByIdAndRemove(userId.params.userId)
            }
        }
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
};