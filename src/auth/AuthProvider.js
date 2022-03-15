import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const isLoggedIn = () => {
    const hasToken = JSON.parse(localStorage.getItem("user"));
    // console.log(hasToken);

    if (hasToken) {
      setAuth(hasToken);
      // console.log(user);
    }
  };

  useEffect(isLoggedIn, [setAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
