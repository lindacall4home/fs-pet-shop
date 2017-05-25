const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
  res.send("GET ALL ROUTE");
});

router.get('/:id',(req,res,next) => {
  res.send("GET ONE NAMED" + req.params.id);
});

router.post('/',(req,res,next) => {
  res.send("CREATE ONE");
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
