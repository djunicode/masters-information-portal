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
    trim:true //Trims spaces before & after
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
  dateOfGrad : {
    type : Date
  },
  sap_id: {
    type : String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
