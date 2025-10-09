const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now } ,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Blog', blogSchema);
