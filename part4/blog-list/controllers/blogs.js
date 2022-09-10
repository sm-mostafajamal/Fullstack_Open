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
