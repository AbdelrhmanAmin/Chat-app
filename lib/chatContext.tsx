import React from "react";
import { useAuth } from "@lib";
import { getAllMessages, createMessage } from "./db";

const initialState = {
  messages: [],
  handleAddMessage: (msg: string) => {},
};

const chatContext = React.createContext(initialState);

const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = React.useState([]);

  const handleGetMessages = async () => {
    const messages = await getAllMessages();
    setMessages(messages);
  };

  const handleAddMessage = async (message: string) => {
    setMessages([
      ...messages,
      {
        message,
        userId: user.id,
        userName: user.name,
        ...user,
        createdAt: Date.now(),
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
  };
  return (
    <chatContext.Provider value={contextValue}>{children}</chatContext.Provider>
  );
};

const useChat = () => React.useContext(chatContext);

export { ChatProvider, useChat };
