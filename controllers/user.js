const express = require('express');
const { encryptPassword, comparePassword } = require('../infra/encryption');
const { auth } = require("../infra/middleware/auth")
const User = require("../models/user")
const router = express.Router();
const bcrypt = require("bcryptjs")

//  winston logger
const logger=require("../config/logger")

// --- Routes

// Endpoint:  /api/users
//Creating a user
router.post("/",async (req,res,next)=>{
    try{
        logger.info("Creating new user...")
        //Checking for existing user with same credintials
        const existingUser = await User.find({email:req.body.email})
        if(existingUser.length>0){
            throw new Error("Email aldready exists,try logging in!")
        }

        const user = new User(req.body);
        logger.info("Generating User Token...")
        const token = await user.newAuthToken()    //Generate auth token
        res.status(201).send({user, token})     
        //We also send the token along with the user so to identify which token is the user currently logged in with
    }catch(err){
        next(err)
    }
})

//   Endpoint:  /api/users/login
//Logging in users
router.post("/login",async (req,res,next)=>{
    try{
        logger.info("User is signing in...")
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
    }catch(err){
        next(err)
    }
})


//Endpoint: /api/users/logout
//Route to logout user from his current session
router.post('/logout', auth, async (req, res,next) => {
    try {
        logger.info("User is logging out...")
        req.user.tokens = req.user.tokens.filter((token) =>{
        return token.token !== req.token 
        })
        await req.user.save()
        res.send("Logged out from current session")
    } catch (err) {
        next(err)
    }
})



//Endpoint:  /api/users/me
//Gives details about the currently logged in user
router.get("/me",auth,async (req,res,next)=>{
    logger.info("Getiing info about logged in user...")
    res.send(req.user) 
})


//Endpoint: /api/users/me
//Route to update current user
router.patch('/me', auth ,async (req,res,next) => {
   
    //Checking if user aldready exists or not
    logger.info("Updating user details...")
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
    } catch (err) {
        next(err)
    }

})


//Endpoint: /api/users/me
//Route to delete current user
router.delete('/me', auth, async (req,res,next) => {
    try {
        logger.info("Deleting user...")
        const existingUser = await User.find({email:req.body.email})
        if(!existingUser){
            return res.status(404).send("User does not exist!")
        }
        await req.user.remove()
        res.send("User deleted")
    } catch (err) {
        next(err)
    }
})


//Endpoint: /api/users/:id
//Get user by id
router.get('/:id', async (req,res,next) => {
    try {
        logger.info("Getting user by id")
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (err) {
        next(err)
    }
})


//Endpoint: /api/users/  ||  /api/users?name=xyz
//Get details as per filter
router.get("/", async (req, res,next) => {
    try {
        logger.info("Getting user details as per query...")
        const data = await User.find(req.query)
        res.status(200).send(data)
    }
    catch (err) {
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



module.exports = router;