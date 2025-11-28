const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("ok")
});

mongoose.connect('mongodb://127.0.0.1:27017/test') 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(7687, () => {
    console.log('Server started on port 7687');
});