exports.validateObjectID = (req,res,next)=>{
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
            success:false,
            message:'Invalid ID',
        });
    }
    next();
};