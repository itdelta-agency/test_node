// const express = require('express');
// const router = express.Router();
// const db = require('./db');
// const bcrypt = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');

exports.home = function (req, res) {
  console.log('HomePage');
  res.json({
    message: 'Добро пожаловать!'
  });
};
