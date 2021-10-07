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

module.exports= mongoose.model('Category',catageorySchema);