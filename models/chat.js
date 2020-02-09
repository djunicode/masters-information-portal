const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MessageSchema=new Schema({
    initiator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message: [{
        // Handle is the Senders name and msg is the actual message
        handle:String,
        msg:String
    }]
})

const Message=mongoose.model('message',MessageSchema);
module.exports=Message;