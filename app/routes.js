const express = require('express');

module.exports = (controller) => {
    const createApp = () => {
        return express();
    };

    const setup = (app) => {
        app.use(express.json());
        app.get('/', (req, res) => {
            res.send("Welcome to Instagram! <br> Check /api/v1/users/[userId] to view users by ID.");
        });

        app.post('/api/v1/users/', (req, res) => {
            return controller.createUser(req.body)
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(err.errorCode || 500).send({
                        message: err.message || "Some error occurred while creating the user."
                    });
                });
        })


        app.get('/api/v1/users/', (req, res) => {
            return controller.findAllUsers(req)
                .then(data => {
                    res.send(data)
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Unable to rerieve users"
                    })
                })
        })

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Instagram is live and listening on port ${port} :)`));
    };

    const app = createApp();
    setup(app);
}