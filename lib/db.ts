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
  serverTimestamp,
} from "firebase/firestore";
import { IUser } from "@lib";

const db = getFirestore(firebase);

export const createMessage = async (message: string, user: IUser) => {
  if (!user) return;
  return await addDoc(collection(db, "messages"), {
    message,
    createdAt: serverTimestamp(),
    userId: user.id,
    photoURL: user.photoURL,
    provider: user.provider,
    userName: user.name,
  });
};

export const createUser = async (user: IUser) => {
  return await setDoc(doc(db, "users", `${user.id}`), user, {
    merge: true,
  });
};

export const getMessagesQuery = (quantity = 10) => {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc"),
    limit(quantity)
  );
  return q;
};

export const getMoreMessages = async (quantity = 10) => {
  const q = getMessagesQuery(quantity);
  const snapShot = await getDocs(q);
  const allMessages = snapShot.docs.map((doc) => doc.data());
  const latestMessages = allMessages.reverse();
  return latestMessages;
};
