const express=require('express');
const path=require('path');
const app=express();
app.use(express.static(__dirname+"/public"));

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'index.html'));
// })
// app.get('/about.html',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'about.html'));
// })

app.post("/addUser",(req,res)=>{
    console.log(req.body)
    let username=req.body.username
    let password= req.body.password;
    res.json({
        username,
        password
    })
})
app.listen(5555,()=>{
    console.log('Server started on http://localhost:5555');
});

