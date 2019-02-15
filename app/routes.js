const express = require("express");
const User = require('./model');

module.exports = controller => {
    const createApp = () => {
        return express();
    };

    const setup = app => {
        app.use(express.json());


        app.get("/", (req, res) => {
            res.send(
                "Welcome to Instagram! <br> Check /api/v1/users/[userId] to view users by ID."
            );
        });


        app.get("/api/v1/users/", (req, res) => {
            return controller
                .getAllUsers(req)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Unable to rerieve users"
                    });
                });
        });


        app.get('/api/v1/users/:userId', (req, res) => {
            return controller.findUser(req)
                .then(data => {
                    if (!data) {
                        return res.status(500).send({
                            message: "There is no user with the ID of : " + req.params.userId
                        })
                    } else {
                        console.log("Now displaying the info for the user with ID :" + req.params.userId)
                    }
                    res.send(data)
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        return res.status(404).send({
                            error: "The ID entered does not match a valid user ID format. Please try entering a valid user ID."
                        });
                    }
                })
        })


        app.put('/api/v1/users/:userId', (req, res) => {
            return controller.updateUser(req)
                .then(data => {
                    if (!data) {
                        return res.status(500).send({
                            message: "There is no user with the ID of : " + req.params.userId
                        })
                    } else {
                        console.log("Information for userID : " + req.params.userId + " has been edited.");
                    }
                    res.send(data)
                }).catch(err => {
                    if (err) {
                        return res.status(404).send({
                            error: "There is no user with the ID of : " + req.params.userId
                        });
                    }
                })
        })


        app.delete('/api/v1/users/:userId', (req, res) => {
            return controller.deleteUserById(req)
                .then(data => {
                    if (!data) {
                        return res.status(500).send({
                            message: "There is no user with the ID of : " + req.params.userId
                        })
                    } else {
                        console.log("Information for userID : " + req.params.userId + " has been deleted.");
                    }
                    res.send(data)
                }).catch(err => {
                    if (err) {
                        return res.status(404).send({
                            error: "There is no user with the ID of : " + req.params.userId
                        });
                    }
                })
        })



        app.post("/api/v1/users/", (req, res) => {
            return controller
                .createUser(req.body)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(err.errorCode || 500).send({
                        message: err.message || "Some error occurred while creating the user."
                    });
                });
        });



        app.post("/api/v1/register", (req, res) => {
            User.findOne({
                email: req.body.email
            }).then(user => {
                if (user) {
                    return res.status(400).json({
                        email: "email already exists"
                    });
                } else {
                    return controller
                        .createUser(req.body)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(err.errorCode || 500).send({
                                message: err.message || "Some error occurred while creating the user."
                            });
                        });
                }
            })
        });








        const port = process.env.PORT || 5000;
        app.listen(port, () =>
            console.log(`Instagram is live and listening on port ${port} :)`)
        );
    };


    const app = createApp();
    setup(app);
};