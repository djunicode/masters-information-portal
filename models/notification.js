const mongoose = require('mongoose');

const NotificationSchema =new mongoose.Schema({
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required:[true,"Please provide the title for notification"]
    },
    message:{
        type:String,
        required:[true,"Please provide the message for notification"]
    },
    read:{
        type:Boolean,
        default:false
    },
    event_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath: 'model',
    },
    model:{
        type: String,
        required: true,
        enum: ['Forum', 'chat']
    }
    

},{timestamps:true})

module.exports = mongoose.model('Notification', NotificationSchema);