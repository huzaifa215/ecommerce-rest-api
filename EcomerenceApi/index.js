const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
// access the API_URL (public varibale) from the env
require("dotenv/config");
const cors=require("cors");
// creating objects
const app=express();
const port=process.env.PORT || 3000;
const api=process.env.API_URL

// make the API use in any interface
app.use(cors());
app.options('*',cors());
//connect to Atlas DataBase
const url=process.env.DataBase_URL;

// mogoDB connection
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
    console.log("Databae Connected....")
}).catch((err)=>{
    console.log(err);
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// midlware use (bodyparser)
app.use(express.json());
// check excution time
app.use(morgan('tiny'));

// routeing data
app.get('/',(req,res)=>{
    res.send("Use Some Routes");
})
//Routes
const ProductRoute=require("./routes/product");
const CatageoryRoute=require("./routes/catageory");

// midlewares 
app.use(`${api}/products`,ProductRoute);
app.use(`${api}/category`,CatageoryRoute);


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});