
const users = [
  {
    name: 'user1',
    email: 'user1@ya.ru',
    password: '$2a$10$OdZ7mk59PkvG/Dvnu1Qd5u9Cll8n4d3DA9KWMHgh39YNSALgPqABi' // 123
  },
  {
    name: 'user2',
    email: 'user2@ya.ru',
    password: '$2a$10$OdZ7mk59PkvG/Dvnu1Qd5u9Cll8n4d3DA9KWMHgh39YNSALgPqABi' // 123
  }
];

let tokens = [];

module.exports.getUser = function (email) {
  return new Promise((resolve, reject) => {
    const user = users.find(e => e.email === email);
    resolve(user);
  });
}

module.exports.getToken = function (token) {
  console.log('getToken', token);
  return new Promise((resolve, reject) => {
    const res = tokens.find(e => e.token === token);
    // console.log(res);
    if (res) {
      resolve(res);
    } else {
      reject(new Error('Couldn\'t find token'));
    }
  });
}

module.exports.add = function (entity_name, data) {
  return new Promise((resolve, reject) => {
    let entity = eval(entity_name);
    entity.push(data);
    console.log('add', entity_name, entity);
    resolve(data);
  })
}

//TODO: подключить DB, токены не удаляются из массива...
module.exports.delete = (entity_name, id) => {
  return new Promise((resolve, reject) => {
    let entity = eval(entity_name);
    entity = entity.map(e => e.id !== id);
    resolve();
  })
}
