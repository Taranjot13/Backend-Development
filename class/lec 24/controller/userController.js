const User = require('../model/user');

exports.getAllUsers = async (req, res) => {
	try {
		let users = await User.find().populate('blogs');
		res.json({ success: true, users });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

exports.getUserById = async (req, res) => {
	try {
		let user = await User.findById(req.params.id).populate('blogs');
		if (!user) return res.json({ success: false, message: 'User not found' });
		res.json({ success: true, user });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
