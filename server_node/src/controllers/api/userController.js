const express = require('express');
const router = express.Router();
const db = require('../../model/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);
}

exports.profile = function (req, res) {
  res.json({
    name: 'Иван',
    lastName: 'Петров'
  })
};

exports.signup = async function (req, res, next) {
  try {
    const user = await db.getUser(req.body.email);
    if (!user) {
      if (!req.body.password) {
        const err = new Error('Password must be provided!');
        err.status = 400;
        next(err);
        return;
      }
      try {
        let result = await db.add('users', {
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
        });
        console.log('User added: ', result.email);

        // авторизуем пользователя
        await db.delete('tokens', req.body.email); // на всякий пожарный
        result = await db.add('tokens', {
          id: req.body.email,
          token: uuidv4()
        });
        console.log('   - new token added: ', result.token);
        res.json({
          token: result.token
        });
      } catch (err) {
        next(err);
      }
    } else {
      const err = new Error('User already exists!');
      err.status = 400;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.signin = async function (req, res, next) {
  console.log('signin:', req.body.email)
  try {
    const user = await db.getUser(req.body.email);
    if (!user) {
      const err = new Error('User not found!');
      err.status = 400;
      next(err);
      return;
    }
    console.log('   - user found...');
    if (isValidPassword(user, req.body.password)) {
      console.log('   - password valid...');
      try {
        await db.delete('tokens', req.body.email);
        const result = await db.add('tokens', {
          id: req.body.email,
          token: uuidv4()
        });
        console.log('   - new token added: ', result.token);
        res.json({
          token: result.token
        });
      } catch (err) {
        console.log(err);
        next(err)
      }
    } else {
      const err = new Error('Password is invalid!');
      err.status = 400;
      next(err);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
