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

test('unique identifier property of the blog posts is named id (not _id)', async () => {
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

  const response = await api.get('/api/blogs');

  const title = response.body.map((b) => b.title);
  expect(title).toContain('React patterns');

  expect(response.body).toHaveLength(oneBlog.length + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
