const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const app = express();
const { info, error } = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware');

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
app.use(tokenExtractor);
app.use(userExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);


module.exports = app;
