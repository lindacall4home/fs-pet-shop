const express = require('express');
const router = express.Router();
const fs = require('fs');

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
    if(req.params.id > (dataArr.length-1) || req.params.id < 0){
      res.sendStatus(404);
    }
    else{
      res.send(dataArr[req.params.id]);
    }
  });
});

router.post('/',(req,res,next) => {
  if (!validateData(req.body)){
    res.sendStatus(400);
  }
  else{
    fs.readFile('pets.json', 'utf8', function(err, data){
      let file = JSON.parse(data);
      file.push(req.body);
      let string = JSON.stringify(file);
      fs.writeFile('pets.json', string, function(err){
      });
    });
    res.status(200);
    res.send(req.body);
  }
});

router.patch('/:id',(req,res,next) => {
  fs.readFile('pets.json', 'utf8', function(err, data){
    let file = JSON.parse(data);
    let currentPet = file[req.params.id];
    for (let key in req.body){
       currentPet[key] = req.body[key];
    }
    let string = JSON.stringify(file);
    fs.writeFile('pets.json', string, function(err){
      res.send(currentPet);
    });
  });
});

router.delete('/:id',(req,res,next) => {
  fs.readFile('pets.json', 'utf8', function(err, data){
    if(err){
      throw err;
    }
    var dataArr = JSON.parse(data);
    let currentPet = dataArr[req.params.id];
    dataArr.splice(req.params.id, 1);
    let string = JSON.stringify(dataArr);
    fs.writeFile('pets.json', string, function(err){
      console.log(dataArr);
      res.send(currentPet);
    });

  });
});

function validateData(dataObj){
  if(Object.keys(dataObj).length != 3){
    return false;
  }
  if(!dataObj.name){
    return false;
  }
  if(!dataObj.kind){
    return false;
  }
  if(!dataObj.age){
    return false;
  }
  if(isNaN(dataObj.age)){
    return false;
  }
  return true;
}

module.exports = router;
