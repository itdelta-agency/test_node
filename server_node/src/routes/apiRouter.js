const express = require('express');
const db = require('../model/db');
const userController = require('../controllers/api/userController.js');

const router = express.Router();

const auth = function (req, res, next) {
  // console.log(req.headers);
  db
    .getToken(req.headers.authorization)
    .then((results) => {
      if (!results) {
        const err = new Error('Not authorized!');
        err.status = 401;
        next(err);
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err);
    })
}


router.get('/profile', auth, userController.profile);

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

module.exports = router;
