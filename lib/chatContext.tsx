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
  const quantity = React.useRef(10);
  const [isLoading, setLoading] = React.useState(false);

  const handleGetMessages = async () => {
    setLoading(true);
    quantity.current += 10;
    const data = await getAllMessages(quantity.current);
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
        ...user,
        createdAt: serverTimestamp(),
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
