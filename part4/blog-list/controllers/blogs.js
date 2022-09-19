const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { info, error } = require('../utils/logger');



blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if(!decodedToken){
      return res.status(401).json({ error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: 0
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch (err) {
    error(next(err));
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    info('Deleted', deletedBlog);
    res.status(204).end();
  } catch (err) {
    error(next(err));
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const { likes } = req.body;
    const response = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes },
      {
        new: true, runValidators: true
      }
    );
    info('updated', response);
    res.status(204).end();
  } catch (err) {
    error(next(err));
  }
});

module.exports = blogsRouter;
