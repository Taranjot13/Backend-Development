const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	let token = req.headers.authorization;
	if (!token) {
		return res.json({ success: false, message: 'Please provide token or login' });
	}
	try {
		let decode = jwt.verify(token, 'lop');
		req.userId = decode.userId;
		next();
	} catch (err) {
		return res.json({ success: false, message: 'Invalid token' });
	}
};
