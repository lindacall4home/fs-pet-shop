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

app.use(function(req, res, next){
  // Grab the "Authorization" header.
  var auth = req.get("authorization");
  console.log(auth);
  if (auth != 'Basic YWRtaW46bWVvd21peA==') {
    res.set("WWW-Authenticate", "Basic realm=\"Required\"");
    res.sendStatus(401);
  }
  else{
    next();
  }
});

app.use('/pets', pets);

app.use(function (req, res, next) {
  res.sendStatus(404);
});

module.exports = app;





app.listen(8000);
