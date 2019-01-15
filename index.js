// Call expressJS and Joi Validation
const express = require('express');
const app = express();
const Joi = require('joi');

// Use body parsing
app.use(express.json());

// Configuration settings for the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Showing the homepage to test connection
app.get('/', (req, res) => {
    res.send("Welcome to Instagram! <br><br> Check /api/v1/instagram/:id to view users by ID <br> Check /api/v1/instagram/user/:name to view users by name");
});

// All the routes
require('./app/routes/instagram.routes.js')(app);

// Create a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Instagram is live and listening on port ${port} :)`));