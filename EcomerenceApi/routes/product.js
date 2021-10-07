const express =require("express");
// import express route
const router =express.Router();
// import the model schema to snd in the Database
const ProductDB=require("../models/product");

router.get('/',async (req,res)=>{
    try{
        const product= await ProductDB.find();
        res.json(product);
    }catch(err){
        res.json(err);
    }
});

// router.post('/',async (req,res)=>{
//    const product=new ProductDB({
//     name:req.body.name,
//     image:req.body.image,
//     countInStock:req.body.count,
//    });
//    try{
//        const data=await product.save();
//        res.json(data);
    
//    }catch(err){
//        res.json(err);
//    }
// });


// // get all the products
// router.get('/',async (req,res)=>{
//    try{
//        const product=await ProductDB.find();
//        res.json(product);
//    }catch(err){
//     res.json(err);   
//    }
// });

// // add a new Products

// router.post('/',async (req,res)=>{
//     const product=new ProductDB({
//         sku:req.body.sku,
//         name:req.body.name,
//         description:req.body.des,
//         image:req.body.image,
//         stockstatus:req.body.ss,
//         price:req.body.price,
//         saleprice:req.body.saleprice,
//         catageory:req.body.catageory,
//         quantity:req.body.quantity,
//     });
//     try{
//         const data = await product.save();
//         res.json(data);
//     }
//     catch(err){
//         res.json(err);
//     }
// });
// // Update Product after Placing the Order
// router.put('/:sku',async (req,res)=>{
//     // seacrh or it 
    
//     try{
//         const product = await ProductDB.update({sku:req.params.sku},
//             {
//                 $set:{
//                     stockstatus : req.body.ss,//quantity === 0 ?"outofStock" : "instock",
//                     //quantity : quantity--,
//                 }
//             });

//         //const data = await product.save();
//         res.json(product);
//     }catch(err){
//         res.json(err);
//     }

// });

// // search
// router.get('/sku/:sku',async (req,res)=>{
//     try{
//         const product=await ProductDB.find({sku:req.params.sku});
//         res.json(product);
//     }catch(err){
//      res.json(err);   
//     }
//  });

//  router.get('/catageory/:catageory',async (req,res)=>{
//     try{
//         const product=await ProductDB.find({catageory:req.params.catageory});
//         res.json(product);
//     }catch(err){
//      res.json(err);   
//     }
//  });



module.exports=router;