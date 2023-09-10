const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");

const app=express();

app.set("view engine",'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/auditoriumBooking");

const addAuditoriumSchema=mongoose.Schema({
    auditoriumName: String,
    totalSeats: Number,
    description: String
})
const addAuditorium=mongoose.model("addAuditorium",addAuditoriumSchema);

app.get('/',function(req,res){
    res.render('index',{});
})
app.get('/contact-us',function(req,res){
    res.render("contact-us",{})
})
app.get('/about-us',function(req,res){
    res.render("about-us",{})
})
app.get('/login',function(req,res){
    res.render("login",{})
})
app.get('/add-auditorium',function(req,res){
    res.render("add-auditorium",{})
})
app.get('/view-auditorium',async (req,res)=>{
    const list=await addAuditorium.find();
    res.render('view-auditorium',{auditoriumlist: list});
})
app.get('/book-auditorium',function(req,res){
    res.render('book-auditorium',{});
})
app.get('/view-detail',function(req,res){
    res.render('view-detail',{});
})

app.post('/add-auditorium', function(req,res){
    const newAuditorium=addAuditorium({
        auditoriumName:req.body.auditoriumName,
        totalSeats: req.body.totalSeats,
        description:req.body.description
    })
    newAuditorium.save();
    res.redirect('/view-auditorium');
})

app.listen(3000,function(err,res){
    if(err)
        console.log(err);
    else
        console.log("port is running in port 3000");
});