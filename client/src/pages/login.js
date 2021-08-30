import {
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "../use-auth";

export default function Login () {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let email = 'user1@ya.ru'
  let password = 'password'

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(email, password, () => {
      history.replace(from);
    });
  };

  return (
    <div>
      <h2>Login</h2>
      {auth.user ? (
        <p>
          Welcome! {" "}
          <button
            onClick={() => {
              auth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={login}>Log in</button>
        </div>
      )}


    </div>
  );
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
