const propertyService = require('../services/propertyService');



exports.getProperties = async(req,res,next)=>{
    try{
        const properties = await propertyService.getAllProperties();
        return res.status(200).json({
            success:true,
            count: properties.length,
            data:properties,
        });
    }catch(err){
       next(err);
    }
};

exports.getProperty = async(req,res,next)=>{
    try{
        const property = await propertyService.getPropertyById(req.params.id);
        if(!property){
            return res.status(404).json({
                success:false,
                message:'Property not found'
            });
        }
       return res.status(200).json({
            success:true,
            data:property,
        });
    }catch(err){
       next(err);
    }
};

exports.createProperty = async (req, res,next) => {
  try {
    const {price,size}=req.body;
    if(price==null || size==null ||price<=0||size<=0){
        return res.status(400).json({
            success:false,
            message: 'Price and size must be positive values',
        });
    }
    const property = await propertyService.createProperty(req.body);
    return res.status(201).json({ success: true, data: property });
  } catch (err) {
   next(err);
  }
};

exports.runAIAnalysis = async (req, res,next) => {
  try {
    const property = await propertyService.analyzePropertyById(req.params.id);
    return res.status(200).json({ success: true, data: property });
  } catch (err) {
   next(err);
  }
};

exports.deleteProperty = async (req, res, next) => {
    try {
        const property = await propertyService.deletePropertyById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

exports.updateProperty = async (req, res, next) => {
    try {
        const property = await propertyService.updatePropertyById(req.params.id, req.body);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: property
        });
    } catch (err) {
        next(err);
    }
};