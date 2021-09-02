const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const productSchema=new Schema({
    sku:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    stockstatus:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    saleprice:{
        type:Number,
        required:true,
    },
    catageory:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    }
});

module.exports=mongoose.model('Product',productSchema);