const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const app = express();
const { info, error } = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

info('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((err) => {
    error('error connecting to MongoDB', err.message);
  });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
