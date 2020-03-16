const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MessageSchema=new Schema({
    //initiator
    sender:
    {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    //to
    receiver:
    {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message: [{
        // Handle is the Senders name and msg is the actual message
        //updated to sender 
        sender:
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        messageBody:String
    }]
})

const Message=mongoose.model('message',MessageSchema);

module.exports={Message};