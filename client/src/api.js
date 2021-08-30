// import { useAuth } from "./use-auth";

const url = 'http://localhost:5000';

export let isAuthenticated = false;

export function getHomePage () {
  return fetch(url).then(res => res.json());
}

export function getProfile (token) {
  return fetch(url + '/profile', {
    headers: {
      'authorization': token
    }
  }).then(res => res.json())
}

export function signin (email, password, cb) {
  // TODO: crypt password
  fetch(url + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(res => res.json())
    .then(res => {
      isAuthenticated = true;
      cb({
        email,
        token: res.token
      });
    });
}

export function signout (cb) {
  isAuthenticated = false;
  cb();
}
