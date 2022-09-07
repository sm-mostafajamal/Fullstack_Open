const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const morgan = require('morgan');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

if (process.argv.length < 3) {
  console.log('Add your mongodb password: npm start <password>');
}

const password = process.argv[2];

const mongoUrl = `mongodb+srv://practice:${password}@practicecluster.uazbw.mongodb.net/blog-list?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then((blogs) => {
      res.json(blogs);
    });
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
