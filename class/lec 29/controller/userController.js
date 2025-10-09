const userService = require('../service/userService');

// User Controllers
module.exports.postUser = async (req, res) => {
    try {
        const { email, name } = req.body;
        
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: "Email and name are required"
            });
        }
        
        const result = await userService.addUser(email, name);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUser(email);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name } = req.body;
        
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: "Email and name are required"
            });
        }
        
        const result = await userService.updateUser(id, email, name);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Tweet Controllers
module.exports.postTweet = async (req, res) => {
    try {
        const { userId, body } = req.body;
        
        if (!userId || !body) {
            return res.status(400).json({
                success: false,
                message: "User ID and tweet body are required"
            });
        }
        
        const result = await userService.addTweet(userId, body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getTweets = async (req, res) => {
    try {
        const tweets = await userService.getAllTweets();
        res.json({
            success: true,
            data: tweets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.updateTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, body } = req.body;
        
        if (!userId || !body) {
            return res.status(400).json({
                success: false,
                message: "User ID and tweet body are required"
            });
        }
        
        const result = await userService.updateTweet(id, userId, body);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }
        
        const result = await userService.deleteTweet(id, userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};