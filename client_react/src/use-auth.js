import React, { useState, useEffect, useContext, createContext } from "react";
import * as api from './api';

const authContext = createContext();

export function ProvideAuth ({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth () {
  return useContext(authContext);
}

function useProvideAuth () {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    const user = await api.signin(email, password);
    setUser(user);
    return user;
  };

  const signup = async (name, email, password) => {
    const user = await api.signup(name, email, password);
    setUser(user);
    return user;
  };

  const signout = cb => {
    return api.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signup,
    signout
  };
}
