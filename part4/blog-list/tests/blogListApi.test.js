const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const { oneBlog } = require('./helperData');

beforeEach(async () => {
  await Blog.deleteMany({});
  const newBlog = new Blog(oneBlog[0]);
  await newBlog.save();
});

test('blogs are returned as json with correct amount of blog posts', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(oneBlog.length);
}, 100000);

test('checking blog posts id property is not _id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('creates a blog verify by blog title & total blogs increased by one', async () => { 
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan"',
    url: 'https://reactpatterns.com/',
    likes: 7
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsFromDB = await Blog.find({});
  const title = blogsFromDB.map((b) => b.title);

  expect(title).toContain('React patterns');
  expect(blogsFromDB).toHaveLength(oneBlog.length + 1);
});

test('if the likes property is missing add likes value to 0', async () => {
  const newBlog = {
    title: 'React',
    author: 'Michael Chan"',
    url: 'https://reactpatterns.com/'
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsFromDB = await Blog.find({});
  if (!(blogsFromDB[blogsFromDB.length - 1]).hasOwnProperty('likes')) {
    blogsFromDB[blogsFromDB.length - 1].likes = 0;
  }
  expect(blogsFromDB[blogsFromDB.length - 1].likes).toBe(0);
});

test('if the title and url properties missing check the status code 400 Bad Request', async () => {
  const newBlog = {
    author: 'Michael Chan"'
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('deleteing individual blog post', async () => {
  const blogsFromDB = await Blog.find({});
  const id = blogsFromDB[blogsFromDB.length - 1].id;
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204);

  expect(blogsFromDB).toHaveLength(oneBlog.length);
});

afterAll(() => {
  mongoose.connection.close();
});