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

  const signin = (email, password, cb) => {
    return api.signin(email, password, user => {
      setUser(user);
      cb();
    });
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
    signout
  };
}
