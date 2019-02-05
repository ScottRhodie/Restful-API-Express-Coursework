const dbConfig = require("./config/database.config");
const initStore = require("./app/store");
const initController = require("./app/controller");
const initRouter = require("./app/routes");

initStore(dbConfig)
    .then(store => {
        const controller = initController(store);
        initRouter(controller);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });