const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { info, error } = require('../utils/logger');

blogsRouter.get('/', async (req, res) => {
  // Blog
  //   .find({})
  //   .then((blogs) => {
  //     res.json(blogs);
  //   });
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  // blog
  //   .save()
  //   .then((result) => {
  //     res.status(201).json(result);
  //   }).catch((error) => next(error));

  try {
    const blog = new Blog(req.body);

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    error(next(err));
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(204);
    info('Deleted', deletedBlog);
    const blogs = await Blog.find({});
    res.json(blogs).end();
  } catch (err) {
    error(next(err));
  }
});

module.exports = blogsRouter;
