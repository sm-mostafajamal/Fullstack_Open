const bcrypt = require('bcrypt');
const supertest = require('supertest');
const User = require('../models/user');
const api = supertest('../app.js');

