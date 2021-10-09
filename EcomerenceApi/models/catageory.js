const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const catageorySchema= new Schema({
    name:{
        type:String,
        required: true,
    },
    color:{
        type:String,
    },
    icon:{
        type:String,
      //  required:true, //depend upon the UI/UX
    },
}) ;
catageorySchema.virtual('id').get(function(){
    return this._id.toHexString();
   });
   catageorySchema.set('toJSON',{
       virtuals:true,
   });

module.exports= mongoose.model('Category',catageorySchema);