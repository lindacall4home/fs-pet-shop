const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

router.get('/',(req,res,next) => {
  res.type('application/json');
  fs.readFile('pets.json', 'utf8', function(err, data){
    if(err){
      throw err;
    }
    var dataArr = JSON.parse(data);
    res.send(dataArr);
  });
});

router.get('/:id',(req,res,next) => {
  fs.readFile('pets.json', 'utf8', function(err, data){
    if(err){
      throw err;
    }
    var dataArr = JSON.parse(data);
    if(req.params.id > dataArr.length - 1){
      res.type('text/plain');
      res.status(404);
      res.send('Not Found');
    }
    else{
      res.type('application/json');
      res.send(dataArr[req.params.id]);
    }
  });
});

router.post('/',(req,res,next) => {
  res.status(200);
  res.type('application/json');
  res.send(req.body);
});

router.put('/:id',(req,res,next) => {
  res.send("UPDATE ONE NAMED " + req.params.id);
});

router.patch('/:id',(req,res,next) => {
  res.send("PARTIAL UPDATE ONE NAMED " + req.params.id);
});

router.delete('/:id',(req,res,next) => {
  res.send("DELETE ONE NAMED " + req.params.id);
});

module.exports = router;
