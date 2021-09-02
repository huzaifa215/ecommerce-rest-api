const express=require('express');
const mongoose=require('mongoose');

const ProductRoute=require("./routes/product");
const CatageoryRoute=require("./routes/catageory");
const CartRoute=require("./routes/cart");
const app=express();
const port=process.env.PORT || 8000;

//connect to Atlas DataBase
//const url="mongodb+srv://huzaifa:03214015920@cluster0.lebbu.mongodb.net/EcommernceApi?retryWrites=true&w=majority";
const url ='mongodb://localhost/EcommerenceApi';

// connect 
// mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
//     console.log("DB connected");
// }).catch((err)=>{
//     console.log(err);
// });
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const con =mongoose.connection;
// check the connection is is stablish or not
con.on('open',()=>{
    console.log("Data Base Connected..........");
});

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Use Some Routes");
})
// midlewares
// products Route
app.use('/products',ProductRoute);
// catageory route
app.use('/catageory',CatageoryRoute);
// cart routes
app.use('/cart',CartRoute);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});