const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../modules/user');

// => localhost:3000/users/list
router.get('/list', (req, res) => {
  User.find((err, docs) => {
    if (!err){res.send(docs); }
    else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.get('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  User.findById(req.params.id, (err, doc) => {
    if(!err) { res.send(doc); }
    else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/', (req, res) => {
  var usr = new User({
    name: req.body.name,
    regNo: req.body.regNo,
    email: req.body.email,
    dues: req.body.dues,
  });
  usr.save((err, doc) => {
    if (!err) { res.send(doc); }
    else {
      console.log('Error in User Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  var usr = {
    name: req.body.name,
    regNo: req.body.regNo,
    email: req.body.email,
    dues: req.body.dues,
  };
  User.findByIdAndUpdate(req.params.id, { $set: usr }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;
