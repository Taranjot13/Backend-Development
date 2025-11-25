const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/test') 
    .then(() => console.log('MongoDB connected'))
app.listen(7687, () => {
    console.log('Server started');
});