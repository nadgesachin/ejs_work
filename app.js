const express = require("express");
const Connection=require('./db/Connection')
const path = require("path");
const User=require('./models/User.models.js')
const app = express();

const PORT = 3005

//ejs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

Connection();

//routers
app.get("/",(req,res)=>{
    const title="Hello Akshay";
    return res.render("home");
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/login",async(req,res)=>{
    const data=req.body;
    const result=await User.findOne({email:data.email})
    if(result){
        if(result.password===data.password){
            res.render("dashboard",{data:result})
        }
        else{
            res.status(500).send("password wrong")
        }
    }
    else{
        res.redirect("register")
    }
})


app.post('/register',async(req,res)=>{
    const data=req.body;
    console.log(data);
    const result=await User.create(data);
    if(result){
        res.render('login')
    }else{
        console.log("error");
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on port number ${PORT}`);
});
























































































