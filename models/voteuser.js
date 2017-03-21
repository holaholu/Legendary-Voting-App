var mongoose        = require("mongoose");

//ADDED FOR AUTHENTICATION
var passportLocalMongoose   = require ("passport-local-mongoose");

var VoteuserSchema = new mongoose.Schema({
     username: String, 
     name: String,
     password:String
    //password2 :String,
  });
  
  //ADDED TO INCLUDE ALL AUTHENTICATION METHOD INTO SCHEMA
 VoteuserSchema.plugin(passportLocalMongoose );
  
  
 module.exports  = mongoose.model('Voteuser',VoteuserSchema );