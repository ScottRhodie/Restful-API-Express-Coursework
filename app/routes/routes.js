module.exports = (app) => {
    const user = require('../controllers/controller.js');

    // Create a new user
    app.post('/api/v1/users/', user.create);

    // Retrieve all user
    app.get('/api/v1/users/', user.findAll);

    // Retrieve a single user with idnumber
    app.get('/api/v1/users/:userId', user.findOne);

    // Update a user with idnumber
    app.put('/api/v1/users/:userId', user.update);

    // Delete a user with idnumber
    app.delete('/api/v1/users/:userId', user.delete);
}