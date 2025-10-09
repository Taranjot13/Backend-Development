const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const isLogin = require('../middleware/auth');

router.post('/', isLogin, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.delete('/:id', isLogin, blogController.deleteBlog);

module.exports = router;
