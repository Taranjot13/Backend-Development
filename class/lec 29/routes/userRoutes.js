const express = require('express');
const { 
    postUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    postTweet,
    getTweets,
    updateTweet,
    deleteTweet
} = require('../controller/userController');

const router = express.Router();

// User routes
router.post('/users', postUser);
router.get('/users', getUsers);
router.get('/users/:email', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Tweet routes
router.post('/tweets', postTweet);
router.get('/tweets', getTweets);
router.put('/tweets/:id', updateTweet);
router.delete('/tweets/:id', deleteTweet);

module.exports = router;

