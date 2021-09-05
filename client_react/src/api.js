// import { useAuth } from "./use-auth";

const url = 'http://localhost:5000';
const api = url + '/api/v1';

export let isAuthenticated = false;

export function getHomePage () {
  return fetch(url).then(res => res.json());
}

export function getProfile (token) {
  return fetch(api + '/profile', {
    headers: {
      'authorization': token
    }
  }).then(res => res.json())
}

export async function signin (email, password) {
  const res = await fetch(api + '/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(res => res.json());

  if (res.error?.status) {
    throw new Error(`${res.error.status}: ${res.message}`);
  }

  return {
    email,
    token: res.token
  };
}

export async function signup (name, email, password) {
  const res = await fetch(api + '/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(res => res.json());

  if (res.error?.status) {
    throw new Error(`${res.error.status}: ${res.message}`);
  }

  return {
    name,
    email,
    token: res.token
  };
}

export function signout (cb) {
  cb();
}
