const express=require('express');
const app=express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());
app.post("/user", (req, res) => {
    try{
        let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    res.json({
        success: true,
        message: "User added successfully",
        data: {
            email: email,
            password: password
        }
    })
    }
    catch(error) {
        success.false,
        console.log(error.message)
    }
});
    
app.listen(3303, () => {
    console.log("Server is running");
})


