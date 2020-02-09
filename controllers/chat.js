const express = require('express');
const socket = require('socket.io')
const mongo = require('../models/chat');
const bodyparser=require("body-parser")

const app = express();

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true}))

const server = app.listen(3000, () => {
    console.log('listening to port 3000');
})

const io = socket(server);

app.use(express.static('public'));

let name;
let toWhom;
let inid;
let toid;

app.post("/chat", async(req, res) => {
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
        // Creating new user if user not found in db
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
app.get("/ret", async(req, res) => {
    const data=await mongo.Message.findOne({initiator:inid,to:toid});
    console.log(data.message)
    res.send(data.message)
})

// Socket Code
io.on('connection', (socket) => {
    console.log(`connection made with socket id-${socket.id}`);
    // Socket to join a room with this name
    socket.join(`${name} ${toWhom}`);
    // Saving that room as sockets room 
    socket.room=`${name} ${toWhom}`
    console.log(socket.room)
    io.to(`${name} ${toWhom}`).emit('updatechat', `${name} has connected to this room`);
    
    // During Chats
    socket.on('chat',async data=>{
        const arr=socket.room.split(" ");
        console.log(arr)
        // Finding both users from db
        const obj=await mongo.User.findOne({name:arr[0]});
        const obj1=await mongo.User.findOne({name:arr[1]});

        console.log(obj);
        // Appending the chats 
        mongo.Message.updateOne({initiator:obj._id,to:obj1._id}, {$push: {"message":  {"handle":`${data.handle}`,"msg":`${data.message}`}}}, function(err, numAffected, rawResponse) {
            console.log(err)
            console.log('The number of updated documents was %d', numAffected);
            console.log('The raw response from Mongo was ', rawResponse);
        });
        // Emmiting to all sockets in the room in our case will be one to one chat 
        // i.e Private chat
        io.to(socket.room).emit('chat',data);
    }

    )

})



