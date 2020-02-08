const mongoose = require('mongoose');
const validator = require("validator")

//This is not the final Schema ,The relations with other schemas are yet to be established!
const userSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true,
    trim : true
  },
  username: {
    type: String,
    required: true,
    trim:true, //Trims spaces before & after
    unique: true 
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    lowercase:true,   
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is Invalid")  
        }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(value.length <= 7){
        throw new Error("Password is too short!")
      }
    }
  },
  graduationDate : {
    type : Date
  },
  bio : {
    type : String
  },
  currentSchool:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Tag'
  },
  accepts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Tag'
  }],
  rejects :[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Tag'
  }],
  pinnedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Forum'
  }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
