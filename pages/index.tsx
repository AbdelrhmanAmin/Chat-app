import React from "react";
import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Button,
  Input,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { useAuth, useChat } from "lib";
import { createMessage } from "lib/db";

const Index = () => {
  const { user, signInWithGitHub, signInWithGoogle, signOut } = useAuth();
  const [message, setMessage] = React.useState("");
  const { messages, handleAddMessage } = useChat();
  return (
    <>
      <Button onClick={signInWithGitHub}>Github</Button>
      <Button onClick={signInWithGoogle}>Google</Button>

      <List>
        {messages.map(({ message }, i) => {
          return (
            <ListItem key={i}>
              <Text>{message}</Text>
            </ListItem>
          );
        })}
      </List>
      <>
        <Button onClick={signOut}>Sign Out</Button>
        <Input
          type="text"
          name="msg"
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <Button onClick={() => handleAddMessage(message)}>Send Msg</Button>
      </>
    </>
  );
};

export default Index;
