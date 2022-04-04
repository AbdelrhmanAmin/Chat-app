import React from "react";
import { useAuth } from "@lib";
import { getAllMessages, createMessage } from "./db";
import { serverTimestamp } from "firebase/firestore";

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
  const quantity = React.useRef(0);
  const messagesRef = React.useRef(messages);
  const hasNoMoreMessages = React.useRef(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleGetMessages = async () => {
    if (hasNoMoreMessages.current) return;
    quantity.current += 5;
    setLoading(true);
    const data = await getAllMessages(quantity.current);
    hasNoMoreMessages.current = data.length === messagesRef.current.length;
    messagesRef.current = data;
    setMessages(data);
    setLoading(false);
  };

  const handleAddMessage = async (message: string) => {
    setMessages([
      ...messages,
      {
        message,
        userId: user.id,
        userName: user.name,
        createdAt: serverTimestamp(),
        ...user,
      },
    ]);
    await createMessage(message, user);
  };
  React.useEffect(() => {
    if (user) {
      handleGetMessages();
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
