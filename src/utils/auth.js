import cookie from "js-cookie";

// Set the cookie
export const setCookie = (key, value) => {
  if (window !== undefined) {
    cookie.set(key, value, { expires: 1 });
  }
};

// remove the cookie
export const removeCookie = (key) => {
  if (window !== undefined) {
    cookie.remove(key, { expires: 1 });
  }
};

// get token from cookie
export const getCookie = (key) => {
  if (window !== undefined) {
    cookie.get(key);
  }
};

// save user cookie in localStorage
export const setLocalStorageCookie = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove user cookie in localStorage
export const removeLocalStorageCookie = (key, value) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

// authenticate user with cookie and localStorage
export const authenticateUser = (response, next) => {
  console.log("Authenticate sign in response", response);
  setCookie("token", response.token);
  setLocalStorageCookie("user", response);
  next();
};

// access user from localStorage
export const isAuthenticated = () => {
  console.log("Check if user authenticated:");

  if (window !== undefined) {
    const verifyCookie = getCookie("token");

    // If cookie is verified
    if (verifyCookie) {
      // If cookie is user
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
