const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog= require('./model/blog');
const userRoutes = require('./userRoutes');
const user = require('./model/user');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRoutes);
//create
app.post('/blogs', async(req, res) => {
  let title= req.body.title;
  let body = req.body.body;
    let blog={
      title: title,
      body: body,
      date: Date.now()
  }
  let newBlog=new Blog(blog)
  await newBlog.save()
  let user= await User.findById(userid);
  userRoutes.blogs.push(newBlog._id);
  await user.save();
  res.json({
	success: true,
	message: "Blog created successfully",
	data:newBlog
  })
})
//read
//read all data
app.get('/blogs', async(req, res) => {
	let allBlogs = await Blog.find();
	res.json({
		success: true,
		message: "All blogs fetched successfully",
		data: allBlogs
	})
})


//read single data
app.get('/blogs/:id', async(req, res) => {
	let id = req.params.id;	
	let blog = await Blog.findById(id);
	res.json({
		success: true,
		message: "Blog fetched successfully",
		data: blog
	})
})

app.delete('/blogs/:id', async(req, res) => {
	let blogId = req.params.blogId;
	let userId = req.body.userId;
	let blog = await Blog.findByIdAndDelete(blogId);
	if(!blogExists) {
		return res.json({
			success: false,
			message: "Blog not found"
		});
	}
	if(blogExist.userId!=userId) {
		return res.json({
			success: false,
			message: "You are not authorized to delete this blog"
		});
	}
	await Blog.findByIdAndDelete(blogId);
})


mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
app.listen(5556, () => {
	console.log(`Server started`);
});

