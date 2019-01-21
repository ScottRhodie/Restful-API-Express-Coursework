const express = require('express');
const app = express();
app.use(express.json());

module.exports = (app, controller) => {
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
    });

    app.get('/api/v1/users/', controller.getAllUsers);

    app.get('/api/v1/users/:userId', controller.getUserById);

    app.put('/api/v1/users/:userId', controller.updateUser);

    app.delete('/api/v1/users/:userId', controller.deleteUser);
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Instagram is live and listening on port ${port} :)`));
}