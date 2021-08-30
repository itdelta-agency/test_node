
const users = [
  {
    email: 'user1@ya.ru',
    password: 'password'
  },
  {
    email: 'user2@ya.ru',
    password: 'password'
  }
];

let token = [];

module.exports.getUser = function (email) {
  return new Promise((resolve, reject) => {
    const user = users.find(e => e.email === email);
    if (user) {
      resolve(user);
    } else {
      reject(new Error('Couldn\'t find user'));
    }
  });
}

module.exports.getToken = function (t) {
  // console.log('getToken', token, t);
  return new Promise((resolve, reject) => {
    const res = token.find(e => e.token === t);
    // console.log(res);
    // if (res) {
      resolve(res);
    // } else {
    //   reject(new Error('Couldn\'t find token'));
    // }
  });
}

module.exports.add = function(data) {
  return new Promise((resolve, reject) => {
    token.push(data);
    resolve(data);
  })
}

module.exports.delete = function (email) {
  return new Promise((resolve, reject) => {
    token = token.map(e => e.email !== email);
    resolve();
  })
}
