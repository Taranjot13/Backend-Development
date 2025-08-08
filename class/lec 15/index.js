const express=require("express")
const app=express();
app.use(express.json());
app.post('/api/data', (req, res) => {
    console.log('Received POST data:', req.body); 
    const { name, email, message } = req.body;    
    res.status(200).json({
        success: true,
        message: 'Data received successfully',
        data: {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        }
    });
});
app.listen(4443,()=>{
    console.log("Server started on port 4443");
})
