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
    const user = req.user;
    if(!user){
      return res.status(401).json({ error: 'token missing or invalid'});
    }

    const userDb = await User.findById(user.id);

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: userDb._id,
      likes: 0
    });

    const savedBlog = await blog.save();
    userDb.blogs = userDb.blogs.concat(savedBlog._id);
    await userDb.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    error(next(err));
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user
    const blog = await Blog.findById(req.params.id);

    if(blog.user.toString() === user.id.toString()){
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
      info('Deleted', deletedBlog);
      res.status(204).json(deletedBlog);
    }
    
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
