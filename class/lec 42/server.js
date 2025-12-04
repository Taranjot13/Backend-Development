const express=require("express");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const User=require("./model/user.model");

app.post("/api/users/register",async (req,res)=>{
    const {name,email,password}=req.body;
    let user =await User.findOne({email:email})
    if(user){
        res.json({
            success:false,
            message:"User already exists"
        })
    }
    let newUser=await User.create({
        name,
        email,
        password
    })
    res.json({
        success:true,
        message:"User registered successfully!!",
    })
});



// app.listen(4444,()=>{
//     console.log("Server is running on port 4444");
// })