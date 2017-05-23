var fs = require('fs');

if(process.argv.length < 3){
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}

if(process.argv[2] === 'read'){
    fs.readFile('pets.json', 'utf8', function(err, data){
      if(err){
        throw err;
    }
    var dataArr = JSON.parse(data);
    if(process.argv.length > 3){
      let index = +process.argv[3];
      if(index > dataArr.length - 1){
        console.error("Usage: node pets.js read INDEX");
        process.exit(1);
      }
      console.log(dataArr[index]);
    }
    else{
      console.log(dataArr);
    }
  });
}

if (process.argv[2] === 'create'){
  if (process.argv.length < 6){
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
  let newObj = {};
  newObj.age = +process.argv[3];
  newObj.kind = process.argv[4];
  newObj.name = process.argv[5];
  fs.readFile('pets.json', 'utf8', function(err, data){
    let file = JSON.parse(data);
    file.push(newObj);
    let string = JSON.stringify(file);
    fs.writeFile('pets.json', string, function(err){
      if (err){
        throw err;
      }
      console.log(newObj);
    });
  });
}
