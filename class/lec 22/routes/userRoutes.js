// userRoutes.js
const express = require('express');


const router = express.Router();

// Example route: GET /users
router.get('/users', (req, res) => {
    res.send('User list');
});

// Example route: POST /users
router.post('/users', (req, res) => {
    res.send('User created');
});

module.exports = router;
