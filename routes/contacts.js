var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact'); // 1

// Contacts - Index ;show all data
router.get('/', function(req, res){ // /contacts .. 의미는 아래 주석 참조
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
     
  });
});
// Contacts - New ; go to insert form 
router.get('/new', function(req, res){ // router.get('/contacts/new', function(req, res){
  res.render('contacts/new');
}); 
// Contacts - create ; insert -> insert_ok
router.post('/', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
    //console.log(contact);
  });
});
// Contacts - show ; 원하는 정보만 표시~ findOne 메소드
router.get('/:id', function(req,res){
  Contact.findOne({_id:req.params.id},function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});
// Contacts - edit // 4
router.get('/:id/edit', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});
// Contacts - update // 5
router.put('/:id', function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});
// Contacts - destroy // 6
router.delete('/:id', function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

module.exports = router;
