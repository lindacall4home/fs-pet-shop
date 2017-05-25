const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
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
    console.log(dataArr);
    if(req.params.id > dataArr.length - 1){
      // res.type('text/plain; charset=utf-8');
      // res.status(404);
      res.sendStatus(404);
    }
    else{
      // res.type('application/json');
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
        // if (err){
        //   res.type('text/plain; charset=utf-8');
        //   res.status(500);
        //   res.send('cannot write')
        // }
        // // console.log(req.body);
      });
    });
    res.status(200);
    // res.type('application/json');
    res.send(req.body);
  }
});

router.put('/:id',(req,res,next) => {
  res.send("UPDATE ONE NAMED " + req.params.id);
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
  res.send("DELETE ONE NAMED " + req.params.id);
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
  return true
}

module.exports = router;
