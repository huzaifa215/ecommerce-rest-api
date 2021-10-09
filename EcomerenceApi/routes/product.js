const express =require("express");
// import express route
const router =express.Router();
// import the model schema to snd in the Database
const ProductDB=require("../models/product");
const CategoryDB=require('../models/catageory');
// get the list of poducts name only or images [-_id] means excluding it 
router.get('/',async (req,res)=>{
    try{
        const product= await ProductDB.find().select('name image images -_id');
        
        res.json(product);
    }catch(err){
        res.json(err);
    }
});

router.get('/all',async (req,res)=>{
    try{
        const product= await ProductDB.find();
        res.json(product);
    }catch(err){
        res.json(err);
    }
});


// get the category details also 
router.get('/details',async (req,res)=>{
    try{
        const product= await ProductDB.find().populate('category');
        res.json(product);
    }catch(err){
        res.json(err);
    }
});
router.post('/',async (req,res)=>{
    // the category id is correct or exits
    const category= await CategoryDB.findById(req.body.category);
    if(!category) return res.status(500).send({message:"The category is invaild or not exits"}); 

    let product = new ProductDB({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images:req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });
    try{
        product = await product.save();
        res.send(product);
    }catch(err){
        res.status(500).send({message:"Product not aadded",error:err})
    }
});


// get 1 product
router.get('/:id',async (req,res)=>{
    try{
        const product= await ProductDB.findById(req.params.id);
        if(!product) return res.status(404).send({message:"Id doesnot find"});

        res.json(product);
    }catch(err){
        res.json(err);
    }
});

// update category
router.put('/:id',async (req,res)=>{
    // the category id is correct or exits
    const category= await CategoryDB.findById(req.body.category);
    if(!category) return res.status(500).send({message:"The category is invaild or not exits"}); 
    try{

    let product = await ProductDB.findOneAndUpdate(
        req.params.id,
        {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images:req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    },
    {new:true}
    ).populate('category');
    res.send(product);
    }catch(err){
        res.status(500).send({message:"not updated",error:err})
    }
});

router.delete('/:id',(req,res)=>{
    // done by promise
    ProductDB.findByIdAndRemove(req.params.id).then((product)=>{
        if(product){
            return res.status(200).json({success:true,message:"The product deleted successfully"});
        }else{
            return res.status(404).json({success:false,message:"Product Not found"});
        }
    }).catch((err)=>{
          return res.status(400).json({success:false,error:err}); 
    });
});

// get products by categeory

router.get('/category/:categoryid',async(req,res)=>{
    const category = await CategoryDB.findById(req.params.id);
    if(category) return res.status(500).send({message:"The category is invaild or not exits"}); 
    try{
        const products = await ProductDB.find({category:req.params.categoryid});
        res.send(products);
    }catch(err){
        res.send(err);
    }
});


// get count the products
router.get('/get/count',async (req,res)=>{
    try{

        const product= await ProductDB.countDocuments((count)=>count);
        if(!product) return res.status(404).send({message:"Id doesnot find"});

        res.send({productscount:product});
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