// Configuration settings for the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

initStore(config).then((store) => {
    const controller = initController(store);
    setupRouter(controller);
}).catch(err => {
    console.log(err);
    process.exit();
});