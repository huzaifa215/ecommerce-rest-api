const express= require('express');
const routes=express.Router();
const CartDB=require('../models/cart');
const ProductDB = require("../models/product");

// get the cart data 
routes.get('/',async (req,res)=>{
try{
    const cartdata=await CartDB.find();

    res.json(cartdata);
   
}catch(err){
 res.json(err);
  
}
});

// add product in Cart
routes.post('/',async (req,res)=>{
    const cartdata=new CartDB({
        productId:req.body.pId,
        quantity:req.body.quantity,
    });
    try{
        const data = await cartdata.save();
        res.json(data);
    }
    catch(err){
        res.json(err);
    }
});

// get the product details 

// delete the data 
routes.delete('/cart/:quantity',async(req,res)=>{
const data =await CartDB.remove({quantity:req.params.quantity});
});

module.exports=routes;
