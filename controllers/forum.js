const express = require('express');
const Forum = require('../models/forum');
const logger = require("../config/logger");
const { auth } = require('../infra/middleware/auth');
const { owner } = require('../infra/middleware/forumAuth');
const router = express.Router();

        //FIND ALL
        router.get('/', async (req,res)=>{   
            try
            {
                logger.info("Getting forum posts")
                let allForums = await Forum.find(req.query);
                return res.send(allForums);
            }         
            catch(err)
            {   
            next(err)
            }    

        });

        //CREATE 
        router.post('/',auth, async (req,res,next)=>{            
            try
            {
                logger.info("Creating forum post")
                let newForum = await Forum.create(req.body);
                return res.json(newForum);
            }
            catch(err)
            {
                next(err)
            }            
        });
        //FIND BY ID
        router.get('/:id',async (req, res,next)=>{  
            try
            {
                logger.info("Get forum post info by id..")
                let foundForum  = await Forum.findById(req.params.id);
                return res.json(foundForum);
            }          
            catch(err)
            {
                next(err)
            }
        });


        //UPDATE
        router.put('/:id',auth,owner,async (req,res,next)=>{
            try
            {
                logger.info("Updating forum post")
                let forum = await Forum.findByIdAndUpdate(req.params.id,req.body,{new:true});
                return res.json(forum);
            }
            catch(err)
            {
                next(err)
            }
        });

        //DESTROY
        router.delete('/:id',auth,owner,(req,res,next)=>{
            logger.info("Deleting forum post")
        Forum.findByIdAndDelete(req.params.id,(error)=>{
            if(error)
            { 
                next(error)
            }
            else{
            res.redirect("/api/forum");
            }
        });
    });


// error handler
    router.use(function(err, req, res, next) {
    //winston logging
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // render the error page
    res.status(err.status||500).json(err.message)
    })  


        module.exports = router;