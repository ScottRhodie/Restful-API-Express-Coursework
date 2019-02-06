const express = require("express");

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
                .findAllUsers(req)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Unable to rerieve users"
                    });
                });
        });

        // current issue - Seems to work fine, however if you use correct amount
        // of characters in the ID, but use one that doesn't exist, it throws an error
        // in postman, but says its displaying the user in the console....
        // putting this to the branch before editting.


        app.get('/api/v1/users/:userId', (req, res) => {
            return controller.findSingleUser(req)
                .then(data => {
                    if (!data) {
                        return res.status(500).send({
                            message: "User not found with that ID"
                        })
                    }
                    res.send(data)
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with ID " + req.params.userId
                        });
                    }
                    // do we need this return part?  worked when removed.
                    return res.status(500).send({
                        message: "Error retrieving user with id " + req.params.userId
                    })
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

        const port = process.env.PORT || 3000;
        app.listen(port, () =>
            console.log(`Instagram is live and listening on port ${port} :)`)
        );
    };

    const app = createApp();
    setup(app);
};