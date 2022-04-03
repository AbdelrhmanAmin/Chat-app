// create message
import firebase from "./firebase";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { IUser } from "@lib";

const db = getFirestore(firebase);

export const createMessage = async (message: string, user: IUser) => {
  return await addDoc(collection(db, "messages"), {
    message,
    createdAt: new Date(),
    id: user.id,
    imageURL: user.imageURL,
  });
};

// get all messages
