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

// get the specific id data
routes.get('/:id', async (req,res)=>{
    try{
        const data = await CatageoryDB.findById(req.params.id);
        res.status(200).send(data);
    }catch(err){
        res.status(404).send({success:false,message:"data donot found",error:err});
    }
});


// update the category
routes.put('/:id',async(req,res)=>{
    try{
        const data = await CatageoryDB.findOneAndUpdate(
            req.params.id,
            {
                name:req.body.name,
                icon:req.body.icon
            },
            {
                new:true
            }
           
        );
       
        res.status(200).send({message:"data changes successfully"});
        //res.send(data);
    }catch(err){
        res.status(404).send(err);
    }
});



module.exports=routes;
