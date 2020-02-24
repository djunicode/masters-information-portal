const express = require('express');
const Forum = require('../models/forum');
const router = express.Router();

        //FIND ALL
        router.get('/', async (req,res)=>{   
            try
            {
                let allForums = await Forum.find(req.query);
                return res.send(allForums);
            }         
            catch(err)
            {
                return res.status(500).json(err);
            }    

        });

        //CREATE 
        router.post('/', async (req,res)=>{            
            try
            {
                let newForum = await Forum.create(req.body);
                return res.json(newForum);
            }
            catch(err)
            {
                return res.status(500).json(err);
            }            
        });
        //FIND BY ID
        router.get('/:id',async (req, res)=>{  
            try
            {
                let foundForum  = await Forum.findById(req.params.id);
                return res.json(foundForum);
            }          
            catch(err)
            {
                return res.status(500).json(err);
            }
        });


        //UPDATE
        router.put('/:id',async (req,res)=>{
            try
            {
                let forum = await Forum.findByIdAndUpdate(req.params.id,req.body);
                return res.json(forum);
            }
            catch(err)
            {
                return res.status(500).json(err);
            }
        });

        //DESTROY
        router.delete('/:id',(req,res)=>{
        Forum.findByIdAndDelete(req.params.id,(error)=>{
            if(error)
            {
                console.log(error);
            }
            else
            res.redirect("/api/forum");
        });
     });


        module.exports = router;