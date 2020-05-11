const notifications=require('../models/notification');

// GET / -Returns all notifications from the db
exports.returnNotifications=async(req,res)=>{
    const userId = res.locals.user._id;
    const notifications=await notifications.find({toUser:userId}).populate('eventId');
    res.status(200).send({
        success:true,
        notifications:notifications}); 
}

// POST /read -Mark all read unread notis
exports.readAll=async(req,res)=>{
    const userId=res.locals.user._id;
    const notification=await notifications.update({toUser:userId},{$set:{read:true}});
    res.send({
        success:true,
        notification:notification
    })
}

// POST /:id/read -Mark particular notification as read
exports.readOne=async(req,res)=>{
    const Id=req.params.id;
    const notification=await notifications.findByIdAndUpdate(Id,{$set:{read:true}});
    res.status(200).send({
        success:true,
        message:'notification updated and boolean set to true',
        notification
    })

}

// DELETE / - Delete all user notifications 
exports.deleteAll=async(req,res)=>{
    const userId = res.locals.user._id;
    const notification=await notifications.remove({toUser:userId})
    res.send({
        success:true,
        msg:'Deleted all notifications',
        notification
    })
    
}


// DELETE /:id - Delete a single notification with its id 
exports.deleteOne=async(req,res)=>{
    const Id=req.params.id;
    const notification=await notifications.findByIdAndDelete(Id);
    res.send({
        success:true,
        msg:`Data deleted with id ${Id}`,
        notification
    })
}