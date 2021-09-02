const express=require('express');
const routes=express.Router();
const CatageoryDB=require("../models/catageory");
const ProductDB = require("../models/product");

// get all catageory
routes.get('/',async (req,res)=>{
   
   try{
    const catageory= await CatageoryDB.find();
    res.json(catageory);
   } catch(err){
       res.json(err);
   }
});

// add the new catagepry
routes.post('/',async (req,res)=>{
    const catageory = new CatageoryDB({
        name: req.body.name,
    });
    try{
        const data= await catageory.save();
        res.json(data);
    }catch(err){
        res.json(err);
    }
});


// show the products related to data catageory
routes.get('/:catageoryname',async(req,res)=>{
    
    try{
        const productdata=await ProductDB.find({
            catageory:req.params.catageoryname
        });
        res.json(productdata);
    }
    catch(err){
        res.json(err);
    }
});

// update the catageory and as the products catageory also updated 
routes.put('/update/:catageoryname',async (req,res)=>{
   try{
    const catageory =await CatageoryDB.updateOne(
        {name:req.params.catageoryname},
        {"name": req.body.name} );
    
        const product=await ProductDB.updateMany(
            {catageory :req.params.catageoryname},
            {
                $set :{
                    catageory:req.body.name,
                }
            },
            );

            //res.send("data Updated Successfully");
       res.json(catageory);
   }catch(err){
        res.json(err)
   }
});

// delete the catgeory and set the product with uncatagory

routes.delete('/delete/:catageoryname',async (req,res)=>{
    try{
    const catageory= await CatageoryDB.remove({catageory:req.params.catageoryname});
    const productdata = await ProductDB.updateMany({catageory:req.params.catageoryname},
        {
           catageory:"Uncatageory",
    });
        res.send("Successfully Deleted and Updated");
    }catch(err){
        res.json(err);
    }
});
module.exports=routes;
