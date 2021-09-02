const mongoose=require('mongoose');
const Scehma=mongoose.Schema;

const cartScehma=new Scehma({

    productId:{
        type:String,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    }
});

 module.exports=mongoose.model('Cart',cartScehma);