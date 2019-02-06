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


        // working id : 5c5985939aea0d11be38b1e0

        app.get('/api/v1/users/:userId', (req, res) => {
            return controller.findSingleUser(req)
                .then(data => {
                    if (!data) {
                        return res.status(500).send({
                            message: "There is no user with the ID of : " + req.params.userId
                        })
                    } else {
                        console.log("Now displaying info for user : " + req.params.userId)
                    }
                    res.send(data)
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        return res.status(404).send({
                            error: "The ID entered does not match the applications ID format. Please try entering a valid ID."
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

        const port = process.env.PORT || 3000;
        app.listen(port, () =>
            console.log(`Instagram is live and listening on port ${port} :)`)
        );
    };

    const app = createApp();
    setup(app);
};