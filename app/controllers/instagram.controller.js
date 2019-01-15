const User = require('../models/instagram.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "name can not be empty"
        });
    }

    // Create a new user
    const user = new User({
        idnumber: req.body.idnumber,
        name: req.body.name,
        photo: req.body.photo || "User has not uploaded a photo",
        likes: req.body.likes || "User has no likes yet..."
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};


// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Unable to get users"
            });
        });
};


// Find a single user with a idnumber
exports.findOne = (req, res) => {
    User.findById(req.params.idnumber)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.idnumber
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.idnumber
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.idnumber
            });
        });
};

// Update a user with the idnumber
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }

    // Find user and update it with the request body ///////////
    User.findByIdAndUpdate(req.params.idnumber, {
            name: req.body.name,
            photo: req.body.photo,
            likes: req.body.likes
        }, {
            new: true
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.idnumber
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.idnumber
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.idnumber
            });
        });
};

// Delete a user with the specified idnumber in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.idnumber)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.idnumber
                });
            }
            res.send({
                message: "User deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.idnumber
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.idnumber
            });
        });
};