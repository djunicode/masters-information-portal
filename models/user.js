const mongoose = require('mongoose');
const validator = require("validator")
const { encryptPassword } = require("../infra/encryption/index")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
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
  //  required:true,
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
  }],
  tokens:[{
    token:{
        type:String,
        required:true
    }
  }],
});


//Generates a new authentication token and concatenates it to the tokens array
const SALT = process.env.SALT || 'djUnicode';
userSchema.methods.newAuthToken = async function(){
    const user  = this
    const token =  jwt.sign({ _id: user.id.toString() },SALT, {expiresIn: "7 days"})
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//Hashes the password before saving
userSchema.pre('save',encryptPassword)

const User = mongoose.model('User', userSchema);

module.exports = User;
