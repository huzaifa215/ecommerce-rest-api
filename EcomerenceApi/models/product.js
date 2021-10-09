const mongoose=require('mongoose');
//2 make obj of schema to create the model
const Schema = mongoose.Schema;

// create the schema
const productSchema=new Schema({
   name:{
       type:String,
       required:true,
   },
   description:{
    type:String,
    required:true,
    },
richDescription:{
    type:String,
    default:""
},
image:{
    type:String,
    required:true,
},
// keh image array kis type ke ai ge
images:{
    type:[String],
    value:[String],
},
brand:{
    type:String,
    default:""
},
price:{
    type:Number,
    required:true,
    default:0
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',// create a relation
    required:true
 },
 countInStock:{
     type:Number,
     required:true,
     min:0,
     max:225,
 },
 rating:{
    type:Number,
    default:0,
},
numReviews:{
    type:Number,
    default:0,
},
isFeatured:{
    type:Boolean,
    default:false,
},
dateCreated:{
    type:Date,
    default:Date.now,
},

});
// changing _id to id
productSchema.virtual('id').get(function(){
 return this._id.toHexString();
});
productSchema.set('toJSON',{
    virtuals:true,
});
// export the module
module.exports=mongoose.model('Products',productSchema);