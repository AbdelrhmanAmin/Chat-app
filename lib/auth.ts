import firebase from "./firebase";
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// sign up (store id + img)

const signInWithGitHub = () => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      console.error(error);
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      console.error(error);
    });
};

const signOut = () => {
  const auth = getAuth();
  auth.signOut().then(() => {});
};
// sign in
// sign out
