import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const intialUserValue = {
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  password: "",
  role: "",
  roleId: 0,
};

const initialState = {
  setUser: () => {},
  user: intialUserValue,
  signOut: () => {},
};

const authContext = createContext(initialState);

export const AuthWarpper = ({ children }) => {
  const [user, _setUser] = useState(intialUserValue);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const str = JSON.parse(localStorage.getItem("user")) || intialUserValue;
    if (str.id) {
      _setUser(str);
    }
    if (!str.id) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (pathname === "/login" && user.id) {
      navigate("/");
    }
    // if (!user.id) {
    //   return;
    // }
    // const access = shared.hasAccess(pathname, user);
    // if (!access) {
    //   toast.warning("sorry, you are not authorized to access this page");
    //   navigate("/");
    //   return;
    // }
    // navigate("/");
  }, [user, pathname]);

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(user);
  };

  const signOut = () => {
    setUser(intialUserValue);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = {
    user,
    setUser,
    signOut,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
export const useAuthContext = () => {
  return useContext(authContext);
};
