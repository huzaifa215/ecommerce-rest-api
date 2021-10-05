const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
// access the API_URL (public varibale) from the env
require("dotenv/config");

// const ProductRoute=require("./routes/product");

// const CatageoryRoute=require("./routes/catageory");
// const CartRoute=require("./routes/cart");
const app=express();
const port=process.env.PORT || 3000;
const api=process.env.API_URL


//connect to Atlas DataBase
const url=process.env.DataBase_URL;

// i will change the EcommerenceApi database to Ecshope
// const url ='mongodb://localhost/EShop-Database'; 
// connect 
// mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
//     console.log("DB connected");
// }).catch((err)=>{
//     console.log(err);
// })
// mogoDB connection
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
    console.log("Databae Connected....")
}).catch((err)=>{
    console.log(err);
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// const con =mongoose.connection;
// // check the connection is is stablish or not
// con.on('open',()=>{
//     console.log("Data Base Connected..........");
// });
// midlware use (bodyparser)
app.use(express.json());
app.use(morgan('tiny'));


app.get('/',(req,res)=>{
    res.send("Use Some Routes");
})

app.get(`${api}/products`,(req,res)=>{
    const products={
        id:1,
        name:"Caps",
        iamge:"http:image",
    };
    res.send(products);
})


// midlewares
// products Route 
// app.use('/products',ProductRoute);
// // catageory route
// app.use('/catageory',CatageoryRoute);
// // cart routes
// app.use('/cart',CartRoute);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});