import React from "react";

const initialState = {
  user: {
    id: 0,
    name: "",
    imageURL: "",
  },
};

const authContext = React.createContext(initialState);

const AuthProvider = ({ children }) => {
  const contextValue = {};

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

const useAuth = () => React.useContext(authContext);

export { useAuth, AuthProvider };
