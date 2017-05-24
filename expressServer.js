const express = require('express');
const app = express();
const fs = require('fs');

app.get('/pets', (req, res)=>{
  res.status(200);
  fs.readFile('pets.json', 'utf8', function(err, data){
    if (err){
      res.status(500);
    }
    res.send(JSON.parse(data));
  });
});


app.get('/pets/:index', (request, response)=>{
  let index = request.params.index;
  fs.readFile('pets.json', 'utf8', function(err, data){
    let pets = JSON.parse(data);
    if(index < 0 || index > pets.length - 1){
      response.status(404);
      response.type('text/plain');
      response.send('Not Found');
    }
    else{
      response.status(200);
      response.send(pets[index]);
    }
  });
});

app.listen(8000, function(){
  console.log('listening on port 8000');
});

module.exports = app;
