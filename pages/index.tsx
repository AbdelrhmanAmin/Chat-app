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
  Stack,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useAuth, useChat } from "lib";
import { GithubIcon, GoogleIcon } from "@components/icons";

const Index = () => {
  const { user, signInWithGitHub, signInWithGoogle, signOut } = useAuth();
  const [message, setMessage] = React.useState("");
  const { messages, handleAddMessage } = useChat();
  return (
    <>
      {user ? (
        <>
          <Button>Start Chatting</Button>
        </>
      ) : (
        <Stack direction={"column"} spacing="2px">
          <Box>
            <Button rightIcon={<GithubIcon />} onClick={signInWithGitHub}>
              Sign in with GitHub
            </Button>
          </Box>
          <Box>
            <Button rightIcon={<GoogleIcon />} onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Index;
