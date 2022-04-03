import firebase from "./firebase";
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
import { IUser } from "@lib";

const db = getFirestore(firebase);

export const createMessage = async (message: string, user: IUser) => {
  return await addDoc(collection(db, "messages"), {
    message,
    userId: user.id,
    ...user,
  });
};

export const createUser = async (user: IUser) => {
  return await setDoc(doc(db, "users", `${user.id}`), user, {
    merge: true,
  });
};

// get all messages
