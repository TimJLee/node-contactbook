// models/Contact.js

var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
/*
var contactSchema = mongoose.Schema({
  objectId:{type:String, required:true, unique:true},
  title:{type:String, required:true},
  contents:[new mongoose.Schema({image: String, video: String})],
  createdAt:{type:Date, default:Date.now, required:true},
  writer:{type:mongoose.Schema.Types.ObjectId, ref:'account', required:true}
  
});
*/
var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
