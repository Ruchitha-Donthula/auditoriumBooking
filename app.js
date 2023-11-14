const express = require("express");
const bodyParser=require('body-parser');//forms
const cors=require('cors');//security 
const app=express();//variable
app.use(express.json());
const corsOptions={
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type','Authorization','x-csrf-token']
}
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
module.exports=app;
