const   express     = require('express'),
        Forum       = require('../models/forum'),
        router      = express.Router();


        router.get('/',async (request,response)=>{            
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


        router.post('/',(request,response)=>{
            //console.log(request.body);
            //var body = JSON.stringify(request.body);
            var newResponse = {
                 question : {
                 title :  request.body.question.title,
                 text : request.body.question.text,
                 createdAt : request.body.question.createdAt,
                 updatedAt : request.body.question.createdAt,
                 //poster : request.body.question.poster,
                 upvoters : request.body.question.upvoters,
                 downvoters : request.body.question.downvoters
                 },
                answer : [{
                 text : request.body.answers[0].text,
                 createdAt : request.body.answers[0].createdAt,
                 updatedAt : request.body.answers[0].createdAt,
                 //poster : request.body.answers[0].poster,
                 upvoters : request.body.answers[0].upvoters,
                 downvoters : request.body.answers[0].downvoters,
                 pinned : request.body.answers[0].pinned                 
                }]                
            }
            console.log(newResponse);
            console.log("gonna start storing into db");
             Forum.create(newResponse,(error,newForum)=>{
                if(error)
                {
                    console.log(error);
                    response.redirect('/');
                }
                else if(!error)
                {
                     console.log(newForum);
                    response.send(newForum);
                }
            })
            console.log("finished storing in the db");
        });

        module.exports = router;