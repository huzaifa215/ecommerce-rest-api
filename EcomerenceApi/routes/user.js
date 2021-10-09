const express =require("express");
// import express route
const router =express.Router();
// import the model schema to snd in the Database
const UserDB=require("../models/users");

const bcrypt=require('bcryptjs');

router.get('/all',async(req,res)=>{
    await UserDB.find().select('-passwordHash').then((user)=>{
        if(user){
            res.json(user);
        }else{
            res.status(500).send({Message:"The user DB is empty"});
        }
    }).catch((Err)=>{
        res.status(404).send({Error:Err});
    })
});

router.get('/:id',async(req,res)=>{
    await UserDB.findById(req.params.id).select('-passwordHash').then((user)=>{
        if(user){
            res.json(user);
        }else{
            res.status(500).send({Message:"The user DB is empty"});
        }
    }).catch((Err)=>{
        res.status(404).send({Error:Err});
    })
});

router.post('/',async(req,res)=>{
    let user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });
    try{
        user=await user.save();
        res.send(user);
    }catch(err){
        res.status(500).send({message:"Product not aadded",error:err})
    }
});

module.exports=router;