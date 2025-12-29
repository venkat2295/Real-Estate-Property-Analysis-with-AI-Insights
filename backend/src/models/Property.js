const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'add a property title'],
        trim:true
    },
    location:{
        type:String,
        required:[true,'add a location'],
        trim:true
    },
    price:{
        type:Number,
        required:[true,'add a price'],
        trim:true
    },
    size:{
        type:Number,
        required:[true,'add a size']
    },
    bedrooms:{
        type:Number,
        required:[true,'add bedrooms']
    },
    bathrooms:{
        type:Number,
        required:[true,'add bathrooms']
    },
    type:{
        type:String,
        enum:['Apartment','House','Villa','Commercial'],
        default:'Apartment'
    },
    features:{
        type:[String],
        default:[]
    },

    aiValuation:{
        estimatedValue: Number,
        marketTrend:String,
        confidence:{type:Number,min:0,max:100}
    },
    aiAnalysis:{
        summary:String,
        investmentScore:{type:Number,min:0,max:10},
        pros:[String],
        cons:[String]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Property',PropertySchema);