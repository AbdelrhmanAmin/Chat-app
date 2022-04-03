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
  Flex,
} from "@chakra-ui/react";
import { useAuth, useChat } from "lib";
import { GithubIcon, GoogleIcon } from "@components/icons";

const Index = () => {
  const { user, signInWithGitHub, signInWithGoogle, signOut } = useAuth();

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      justify="center"
      alignItems="center"
    >
      {user ? (
        <>
          <Button>🔥 Start Chatting</Button>
        </>
      ) : (
        <Stack direction={"column"} spacing="8px">
          <Box>
            <Button
              rightIcon={<GithubIcon />}
              colorScheme="gray"
              onClick={signInWithGitHub}
            >
              Sign in with GitHub
            </Button>
          </Box>
          <Box>
            <Button
              rightIcon={<GoogleIcon />}
              bgColor="Highlight"
              textColor="white"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Box>
        </Stack>
      )}
    </Flex>
  );
};

export default Index;
