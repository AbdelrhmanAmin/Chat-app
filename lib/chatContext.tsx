import React from "react";
import { useAuth } from "@lib";
import { createMessage, getMessagesQuery, getMoreMessages } from "./db";
import { onSnapshot } from "firebase/firestore";

const initialState = {
  messages: [],
  handleAddMessage: (msg: string) => {},
  isLoading: false,
  handleGetMessages: () => {},
};

const chatContext = React.createContext(initialState);

const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = React.useState([]);
  const quantity = React.useRef(10);
  const messagesRef = React.useRef(messages);
  const hasNoMoreMessages = React.useRef(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleGetMessages = async () => {
    if (hasNoMoreMessages.current) return;
    quantity.current += 5;
    setLoading(true);
    const msgs = await getMoreMessages(quantity.current);
    hasNoMoreMessages.current = msgs.length === messagesRef.current.length;
    messagesRef.current = msgs;
    setMessages(msgs);
    setLoading(false);
  };

  const handleAddMessage = async (message: string) => {
    await createMessage(message, user);
  };
  React.useEffect(() => {
    if (user) {
      // start listening for changes.
      const q = getMessagesQuery(10);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allMessages = querySnapshot.docs.map((doc) => doc.data());
        const latestMessages = allMessages.reverse();
        setMessages(latestMessages);
      });
      return () => unsubscribe();
    }
  }, [user]);
  const contextValue = {
    messages,
    handleAddMessage,
    isLoading,
    handleGetMessages,
  };
  return (
    <chatContext.Provider value={contextValue}>{children}</chatContext.Provider>
  );
};

const useChat = () => React.useContext(chatContext);

export { ChatProvider, useChat };
