import firebase from "./firebase";
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
  query,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { IUser } from "@lib";

const db = getFirestore(firebase);

export const createMessage = async (message: string, user: IUser) => {
  console.log(message, user);
  if (!user) return;
  return await addDoc(collection(db, "messages"), {
    message,
    createdAt: Date.now(),
    userId: user.id,
    ...user,
  });
};

export const createUser = async (user: IUser) => {
  return await setDoc(doc(db, "users", `${user.id}`), user, {
    merge: true,
  });
};

export const getAllMessages = async () => {
  const messagesRef = query(
    collection(db, "messages"),
    orderBy("createdAt"),
    limit(25)
  );
  const messagesSnapShot = await getDocs(messagesRef);
  const allMessages = messagesSnapShot.docs.map((doc) => doc.data());
  return allMessages;
};
