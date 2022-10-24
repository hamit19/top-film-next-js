import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext();
const AuthContextDispatcher = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    try {
      axios.get("/api/auth/user").then((res) => {
        if (res.data.token) {
          const {
            username,
            email,
            created,
            profilePhoto,
            role,
            sub,
            sub_time,
          } = jwt.decode(res?.data?.token);

          setAuthState({
            token: res?.data?.token,
            user: {
              username,
              email,
              created,
              profilePhoto,
              role,
              sub,
              sub_time,
            },
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const isAuthenticated = () => (authState?.token ? true : false);

  return (
    <Provider value={{ authState, isAuthenticated }}>
      <AuthContextDispatcher.Provider value={setAuthState}>
        {children}
      </AuthContextDispatcher.Provider>
    </Provider>
  );
};

export { AuthContext, AuthContextDispatcher, AuthProvider };
