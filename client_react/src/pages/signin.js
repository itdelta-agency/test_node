import {
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "../use-auth";

export default function Signin () {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let [email, setEmail] = useState('user1@ya.ru');
  let [password, setPassword] = useState('123');
  let [error, setError] = useState('');

  let { from } = location.state || { from: { pathname: "/" } };

  let login = () => {
    auth.signin(email, password)
      .then(() => {
        history.replace(from);
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div>
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

        <section class="w-full px-8 py-16 bg-gray-100 xl:px-8">
          <div class="max-w-5xl mx-auto">
            <div class="flex flex-col items-center md:flex-row">

              <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                <p class="font-medium text-blue-500 uppercase">Building Businesses</p>
                <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                    Changing The Way People Do Business.
                </h2>
                <p class="text-xl text-gray-600 md:pr-16">Learn how to engage with your visitors and teach them about your mission. We're revolutionizing the way customers and businesses interact.</p>
              </div>

              <div class="w-full mt-16 md:mt-0 md:w-2/5">
                <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                  <h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
                  <input type="text" name="email" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" placeholder="Email address"
                  value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" name="password" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <div class="block">
                      <button onClick={login} class="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg">Log Me In</button>
                  </div>
                  <p class="w-full mt-4 text-sm text-center text-gray-500">
                    Don't have an account? <Link to="/signup" class="text-blue-500 underline">Sign up here</Link>
                  </p>
                  <div className="relative">
                    { error &&
                      <label className="font-medium text-red-600">{error}</label>
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      )}


    </div>
  );
}

// <div>
//   <p>You must log in to view the page at {from.pathname}</p>
//   <button onClick={login}>Log in</button>
// </div>

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
