var mongoose        = require("mongoose");



var PollSchema = new mongoose.Schema({
     title: String, 
     author: String,
     options:[],
     count:[],
    
  });
  
 
  
  
 module.exports  = mongoose.model('Poll',PollSchema );