const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const pets = require('./routes/pets.js');

app.use(morgan());
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/pets', pets);

module.exports = app;





app.listen(8000);
