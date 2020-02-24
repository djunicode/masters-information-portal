const express = require('express');
const mongo = require('../models/chat');
const router = express.Router();

let name;
let toWhom;
let inid;
let toid;

router.post("/chat", async(req, res) => {
    // Finding from db if the user is present 
    const init=await mongo.User.findOne({name:req.body.initiator});
    const to=await mongo.User.findOne({name:req.body.to});
    const ini=await mongo.Message.findOne({initiator:init._id,to:to._id});
    const ini2=await mongo.Message.findOne({initiator:to._id,to:init._id});
    
    if(ini){
        name=req.body.initiator;
        toWhom=req.body.to;
        res.send(ini.message)
        inid=init._id;
        toid=to._id
    }
    else if(ini2){
        name=req.body.to;
        toWhom=req.body.initiator;
        res.send(ini2.message)
        inid=to._id;
        toid=init._id
    }
    else{
        const newUser=new mongo.Message({
            initiator:await mongo.User.findOne({name:req.body.initiator}),
            to:await mongo.User.findOne({name:req.body.to})
        }).save().then(data=>{
            console.log(data);
            res.send(data);
        }).catch(e=>console.log(e))
        name=req.body.initiator;
        toWhom=req.body.to; 
    }
});

// To display the previous chats 
router.get("/ret", async(req, res) => {
    const data=await mongo.Message.findOne({initiator:inid,to:toid});
    console.log(data.message)
    res.send(data.message)
})

