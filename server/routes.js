const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

let auth = function(req, res, next) {
  console.log(req.headers);
  db
    .getToken(req.headers.authorization)
    .then((results) => {
      if (!results) {
        const err = new Error('Не авторизован!');
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

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);
}

router.get('/', (req, res) => {
  console.log('HomePage');
  res.json({
    message: 'Добро пожаловать!'
  })
});

router.get('/profile', auth, (req, res) => {
  res.json({
    name: 'Иван',
    lastName: 'Петров'
  })
});

// router.post('/registration', (req, res, next) => {
//   if(req.body.password === req.body.repeatPassword){
//     db
//       .getUser(req.body.email)
//       .then((results)=>{
//         if (results.length == 0){
//           data = {
//             email: req.body.email,
//             password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
//           };
//           db
//             .add('users', data)
//             .then((results)=>{
//               res.json({
//                 message: 'Пользователь добавлен: ' + results[0]
//               })
//             })
//             .catch((err)=>{
//               next(err);
//             })
//         } else {
//           const err = new Error('Такой пользователь уже есть!');
//           err.status = 400;
//             next(err);
//         }
//       })
//       .catch((err)=>{
//         next(err);
//       })
//   } else {
//     const err = new Error('Не совпадает пароль и подтверждение пароля!');
//     err.status = 400;
//       next(err);
//   }
// })

router.post('/login', (req, res, next) => {
  console.log('login:', req.body)
  db
    .getUser(req.body.email)
    .then((result) => {
      console.log('result:', result);
      // пока plain text
      // if (isValidPassword(result, req.body.password)) {
      if (result.password === req.body.password) {
        const data = {
          login: req.body.email,
          token: uuidv4()
        };
        console.log(data);
        db
          .delete(req.body.email)
          .then((results) => {
            db
              .add(data)
              .then((results) => {
                res.json({
                  token: results.token
                })
              })
              .catch((err) => {
                console.log(err);
                next(err)
              })
          })
          .catch((err) => {
            console.log(err);
            next(err)
          })
      } else {
        const err = new Error('Не верный логин или пароль!');
        err.status = 400;
        next(err);
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    })
})

module.exports = router;
