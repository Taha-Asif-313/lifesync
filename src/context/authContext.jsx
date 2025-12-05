"use client";

import { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
      setIsLogin(true);
    }
  }, []);

  // Update login state whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLogin(true);
    } else {
      localStorage.removeItem("userInfo");
      setIsLogin(false);
    }
  }, [userInfo]);

  // Login user
  const loginUser = useCallback((user) => {
    setUserInfo(user);
  }, []);

  // Logout user
  const logoutUser = useCallback(() => {
    setUserInfo(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLogin,       // ← added
        setUserInfo,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
