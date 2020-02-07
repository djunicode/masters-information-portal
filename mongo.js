const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    socketid:String
})

const MessageSchema=new Schema({
    initiator:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    message: [{
        // Handle is the Senders name and msg is the actual message
        handle:String,
        msg:String
    }]
})

const Message=mongoose.model('message',MessageSchema);
const User=mongoose.model('user',userSchema);
module.exports={User,Message};