const express = require('express');
const { encryptPassword, comparePassword } = require('../infra/encryption');
const { auth } = require("../infra/middleware/auth")
const User = require("../models/user")
const router = express.Router();
const bcrypt = require("bcryptjs")
// --- Routes

// Endpoint:  /api/users
//Creating a user
router.post("/",async (req,res)=>{

    try{
        //Checking for existing user with same credintials
        const existingUser = await User.find({email:req.body.email})
        if(existingUser.length>0){
            throw new Error("Email aldready exists,try logging in!")
        }

        const user = new User(req.body);
        const token = await user.newAuthToken()    //Generate auth token
        res.status(201).send({user, token})     
        //We also send the token along with the user so to identify which token is the user currently logged in with
    }catch(e){
        res.status(400).json({
            error:"User creation Failed"
        })
    }
})

//   Endpoint:  /api/users/login
//Logging in users
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("Unable to login")
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            throw new Error("Unable to login")
        }
        //If email and password are correct,it generates a new token and appends it to the tokens array
        const token = await user.newAuthToken()
        res.send({
            user:user,
            token:token    
        })
    }catch(e){
        console.log(e)
        res.status(401).json({
            error:"Failed to Login"
        })
    }
})


//Endpoint: /api/users/logout
//Route to logout user from his current session
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.user.save()
        res.send("Logged out from current session")
    } catch (error) {
        res.status(500).send({
            error:"Failed to Logout"
        })
    }
})



//Endpoint:  /api/users/me
//Gives details about the currently logged in user
router.get("/me",auth,async (req,res)=>{
    res.send(req.user) 
})


//Endpoint: /api/users/me
//Route to update current user
router.patch('/me', auth ,async (req,res) => {
   
    //Checking if user aldready exists or not
    const existingUser = await User.find({email:req.body.email})
    if(!existingUser){
        return res.status(404).send("User does not exist!")
    }

    const updates  = Object.keys(req.body)      //Returns all the keya as an array
    const allowedUpdates = ["name", 'username',"email", "password", "graduationDate","bio","currentSchool","accepts","rejects","pinnedQuestions"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    try {        
        updates.forEach((update) => req.user[update] = req.body[update]) 
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }

})


//Endpoint: /api/users/me
//Route to delete current user
router.delete('/me', auth, async (req,res) => {
    try {
        const existingUser = await User.find({email:req.body.email})
        if(!existingUser){
            return res.status(404).send("User does not exist!")
        }
        await req.user.remove()
        res.send("User deleted")
    } catch (error) {
        res.status(500).send()
    }
})


//Endpoint: /api/users/:id
//Get user by id
router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(404).send()
    }
})


//Endpoint: /api/users/  ||  /api/users?name=xyz
//Get details as per filter
router.get("/", async (req, res) => {
    try {
        console.log(req.query)
        const data = await User.find(req.query)
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).send(err)
    }
  })
  

module.exports = router;
