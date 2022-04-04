import React from "react";
import firebase from "./firebase";

import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { createUser } from "./db";

const auth = getAuth(firebase);

const initialState = {
  user: null,
  signInWithGitHub: () => {},
  signInWithGoogle: () => {},
  signOut: () => {},
};

const authContext = React.createContext(initialState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      handleUser(user);
    });
  }, []);
  const handleUser = (rawUser) => {
    if (rawUser) {
      const userData = formatUser(rawUser);
      setUser(userData);
      createUser(userData);
    } else {
      setUser(null);
    }
  };

  const signInWithGitHub = async () => {
    setPersistence(auth, browserLocalPersistence).then(async () => {
      try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        const user = result.user;
        handleUser(user);
      } catch (err) {
        return handleUser(null);
      }
    });
  };
  const signInWithGoogle = async () => {
    setPersistence(auth, browserLocalPersistence).then(async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        const user = result.user;
        handleUser(user);
      } catch (err) {
        return handleUser(null);
      }
    });
  };

  const signOut = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      handleUser(null);
    });
  };

  const contextValue = {
    user,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
  };
  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

const useAuth = () => React.useContext(authContext);

export { useAuth, AuthProvider };

const formatUser = (user) => {
  return {
    id: user.uid,
    name: user.displayName,
    photoURL: user.photoURL,
    provider: user.providerData[0].providerId,
  };
};
