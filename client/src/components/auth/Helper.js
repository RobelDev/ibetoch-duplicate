import cookie from "js-cookie";
//import { token } from "morgan";
import axios from "axios";

//set in cookie
export const setCookieToken = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 3,
    });
  }
};
//remove cookie
export const removeCookieToken = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 3,
    });
  }
};
//get from cookie a- stored token
export const getCookieToken = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

//set in local storage
export const setLocalStorageToken = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorageToken = (key) => {
  if (window !== "undefined") {
    localStorage.getItem(key);
  }
};
//remove from local storage
export const removeLocalStorageToken = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
//authenticate user by passing data to cookie and local storage during sign in
export const Authenticate = (res, next) => {
  console.log("auth helper on sign in", res);
  setCookieToken("token", res.data.token);
  setLocalStorageToken("user", res.data.user);

  next();
};
//access user info from local storage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieAvailable = getCookieToken("token");

    if (cookieAvailable) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
    // localStorage.setItem(key, JSON.stringify(value));
  }
};

export const setAuth = (token) => {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};
