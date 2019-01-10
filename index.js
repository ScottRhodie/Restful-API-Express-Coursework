const Joi = require('joi');
const home = require('./routes/home')
const instagram = require('./routes/instagram')
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/users/', instagram);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Instagram is live and listening on port ${port} :)`));
