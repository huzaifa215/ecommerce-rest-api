const express=require('express');
const routes=express.Router();
const CatageoryDB=require("../models/catageory");


routes.get('/',async(req,res)=>{
    try{
        const category=await CatageoryDB.find();
        res.json(category);
    }catch(err){
        //console.log("error to display the category");
        res.status(500).json({success:false});
    }
});

routes.post('/',async(req,res)=>{
    // done by await and async
    let categorylist= new CatageoryDB({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
    });
        try{
            categorylist = await categorylist.save();
            res.json(categorylist);
        }catch(err){
            res.status(400).send("Cannnot add the Category");
        }
});

routes.delete('/:id',(req,res)=>{
    // done by promise
    CatageoryDB.findByIdAndRemove(req.params.id).then((category)=>{
        if(category){
            return res.status(200).json({success:true,message:"The category deleted successfully"});
        }else{
            return res.status(404).json({success:false,message:"Category Not found"});
        }
    }).catch((err)=>{
          return res.status(400).json({success:false,error:err}); 
    });
});
// // get all catageory
// routes.get('/',async (req,res)=>{
   
//    try{
//     const catageory= await CatageoryDB.find();
//     res.json(catageory);
//    } catch(err){
//        res.json(err);
//    }
// });

// // add the new catagepry
// routes.post('/',async (req,res)=>{
//     const catageory = new CatageoryDB({
//         name: req.body.name,
//     });
//     try{
//         const data= await catageory.save();
//         res.json(data);
//     }catch(err){
//         res.json(err);
//     }
// });


// // show the products related to data catageory
// routes.get('/:catageoryname',async(req,res)=>{
    
//     try{
//         const productdata=await ProductDB.find({
//             catageory:req.params.catageoryname
//         });
//         res.json(productdata);
//     }
//     catch(err){
//         res.json(err);
//     }
// });

// // update the catageory and as the products catageory also updated 
// routes.put('/update/:catageoryname',async (req,res)=>{
//    try{
//     const catageory =await CatageoryDB.updateOne(
//         {name:req.params.catageoryname},
//         {"name": req.body.name} );
    
//         const product=await ProductDB.updateMany(
//             {catageory :req.params.catageoryname},
//             {
//                 $set :{
//                     catageory:req.body.name,
//                 }
//             },
//             );

//             //res.send("data Updated Successfully");
//        res.json(catageory);
//    }catch(err){
//         res.json(err)
//    }
// });

// // delete the catgeory and set the product with uncatagory

// routes.delete('/delete/:catageoryname',async (req,res)=>{
//     try{
//     const catageory= await CatageoryDB.remove({catageory:req.params.catageoryname});
//     const productdata = await ProductDB.updateMany({catageory:req.params.catageoryname},
//         {
//            catageory:"Uncatageory",
//     });
//         res.send("Successfully Deleted and Updated");
//     }catch(err){
//         res.json(err);
//     }
// });
module.exports=routes;
