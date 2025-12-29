const Property = require('../models/Property');
const aiService = require('./aiService');

exports.createProperty = async (propertyData) => {
  return await Property.create(propertyData);
};
exports.analyzePropertyById = async(id)=>{
    const property = await Property.findById(id);
    if(!property){
        throw new Error('Property not found');
    }
    const aiInsights = await aiService.analyzeProperty(property);
    
    property.aiValuation = aiInsights.valuation;
    property.aiAnalysis = aiInsights.analysis;
    return await property.save();
};

exports.getAllProperties = async()=>{
    return await Property.find().sort({createdAt:-1});
};

exports.getPropertyById = async(id)=>{
    return await Property.findById(id);
};