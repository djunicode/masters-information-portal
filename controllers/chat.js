const express = require('express');
const mongo = require('../models/chat');
const router = express.Router();

//  winston logger
const logger=require("../config/logger")

let senderId;
let receiverId;
//why are we using name,senderId,recevierId,TWhom when we arent even storing it ??
//if we dont need them we can send them to get req block to avoid deadlock

router.post("/chat", async(req, res,next) => {

let name;
let TWhom;
    // Finding from db if the user is present 
    const sender = await mongo.User.findOne({name:req.body.sender});
    const receiver = await mongo.User.findOne({name:req.body.receiver});
    const messageSender = await mongo.Message.findOne({sender:sender._id,receiver:receiver._id});
    const messageReceiver = await mongo.Message.findOne({sender:receiver._id,receiver:sender._id});
    //here messageReceiver is actually a sender
    
    if(messageSender)
    {
        logger.info("MessageSender")
        name = req.body.sender;
        TWhom = req.body.receiver;
        res.send(messageSender.message)
        senderId = sender._id;
        receiverId = receiver._id
    }
    else if(messageReceiver)
    {
        logger.info("MessageReceiver")
        name = req.body.receiver;
        TWhom = req.body.sender;
        res.send(messageReceiver.message)
        senderId = receiver._id;
        receiverId = sender._id
    }
    else
    {
        logger.info("Creating newChat...")
        const newUser = new mongo.Message({
            sender:await mongo.User.findOne({name:req.body.sender}),
            receiver:await mongo.User.findOne({name:req.body.receiver})
        }).save().then(data=>{
            console.log(data);
            res.send(data);
        }).catch(err=>{
            next(err)
        })
        name = req.body.sender;
        TWhom = req.body.receiver; 
    }
});

// To display the previous chats 
router.get("/ret", async(req, res,next) => {
    try{
    logger.info("Displaying previous chats...")
    const data = await mongo.Message.findOne({sender:senderId,receiver:receiverId});
    console.log(data.message)
    res.send(data.message)
    }
    catch(err){
        next(err)
    }
})



// error handler
router.use(function(err, req, res, next) {
    //winston logging
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // render the error page
    res.status(err.status||500).json(err.message)
    })  


module.exports=router
