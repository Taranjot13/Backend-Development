const Blog = require('../model/blog');
const User = require('../model/user');

exports.createBlog = async (req, res) => {
	const { title, body } = req.body;
	const userId = req.userId;
	try {
		let user = await User.findById(userId);
		if (!user) return res.json({ success: false, message: 'Invalid user' });
		let blog = new Blog({ title, body, date: Date.now(), userId });
		await blog.save();
		user.blogs.push(blog._id);
		await user.save();
		res.json({ success: true, blog });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

exports.getAllBlogs = async (req, res) => {
	try {
		let blogs = await Blog.find().populate('userId', 'username email');
		res.json({ success: true, blogs });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

exports.getBlogById = async (req, res) => {
	try {
		let blog = await Blog.findById(req.params.id).populate('userId', 'username email');
		if (!blog) return res.json({ success: false, message: 'Blog not found' });
		res.json({ success: true, blog });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

exports.deleteBlog = async (req, res) => {
	try {
		let blog = await Blog.findByIdAndDelete(req.params.id);
		if (!blog) return res.json({ success: false, message: 'Blog not found' });
		res.json({ success: true, message: 'Blog deleted' });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
