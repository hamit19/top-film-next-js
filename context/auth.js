import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const AuthContextDispatcher = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    try {
      axios
        .get("/api/auth/user")
        .then((res) => setAuthState({ token: res?.data?.token }));
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
