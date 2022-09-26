const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id
    delete returnObject.__v
  }
});

module.exports = mongoose.model('Blog', blogSchema);
