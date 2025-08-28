const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user');
const Blog = require('./model/blog');

const app = express();
app.use(express.json());
app.use(express.static('public'));


function isLogin(req,res,next){
    let token=req.headers.authorization;
    if(!token){
        return res.json({
            success:false,
            message:"please provide token or login"
        })
    }
    let decode=jwt.verify(token,"lop");
    if(!decode){
        return res.json({
            success:false,
            message:"invalid token"
        })
    }
    let blog={
        title:req.body.title,
        content:req.body.content
    }

    req.userId=decode.userId;
    next();
}


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Routes
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Blog Routes
app.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username email');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});