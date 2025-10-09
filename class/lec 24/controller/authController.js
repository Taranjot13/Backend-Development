const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		let user = new User({ username, email, password, blogs: [] });
		await user.save();
		res.json({ success: true, message: 'User registered', user });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email, password });
		if (!user) {
			return res.json({ success: false, message: 'Invalid credentials' });
		}
		let token = jwt.sign({ userId: user._id }, 'lop');
		res.json({ success: true, token });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
