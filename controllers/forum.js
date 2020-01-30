const   express     = require('express'),
        Forum       = require('../models/forum'),
        router      = express.Router();

        //FIND ALL
        router.get('/', async (request,response)=>{            
            await Forum.find({},(error,allForums)=>{
                if(error)
                {
                    console.log(error);
                    response.redirect('/');
                }
                else
                {
                    response.send(allForums);
                }
            });
        });

        //CREATE 
        router.post('/', async (request,response)=>{            
             await Forum.create(request.body,(error,newForum)=>{
                if(error)
                {
                    console.log(error);
                    response.redirect('/api/forum');
                }
                else if(!error)
                {
                     console.log(newForum);
                    response.send(newForum);
                }
            })
        });
        //FIND BY ID
        router.get("/:id",async function(request, response){            
            await Forum.findById(request.params.id,(error, foundForum)=>{
                if(error)
                {
                    console.log(err);
                } else 
                {                    
                    response.send(foundForum);
                }
            });
        });


        //UPDATE
        router.put("/:id",async (request,response)=>{
            await Forum.findByIdAndUpdate(request.params.id,request.body,(error,forum)=>{
                if(error)
                {
                    console.log(err);
                    response.redirect("/api/forum");
                }
                else
                {
                    response.send(forum);
                }
            });    
        });

        //DESTROY
        router.delete("/:id",(request,response)=>{
        Forum.findByIdAndDelete(request.params.id,(error)=>{
            if(error)
            {
                console.log(error);
            }
            else
            response.redirect("/api/forum");
        });
     });


        module.exports = router;