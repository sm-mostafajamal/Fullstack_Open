const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
  res.status(200).json(users);
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const userExists = await User.findOne({ username });

    if (password === undefined || password.length < 3) {
      return res.status(400).json({
        'error' : 'Password is too short or password is missing'
      });
    } else if (userExists) {
      return res.status(400).json({
        'error' : 'username already exists, username must be unique!'
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});
module.exports = usersRouter;
