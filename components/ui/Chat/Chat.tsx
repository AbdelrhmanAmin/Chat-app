import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth, useChat } from "@lib";
import React from "react";

const Chat = () => {
  const { messages, handleAddMessage } = useChat();
  const { user } = useAuth();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const lastRef = React.useRef<HTMLDivElement>(null);
  return (
    <Stack
      direction="column"
      spacing="0"
      rounded="lg"
      justify="flex-end"
      alignItems="flex-start"
      width={{ base: "100%", md: "80%", lg: "50%" }}
      height="80vh"
      border="4px"
    >
      <Stack
        height="100%"
        width="100%"
        overflowY="auto"
        pt={{ base: 4, md: 8 }}
        px={{ base: 4, md: 8 }}
      >
        {messages.map((message) => {
          return (
            <Stack
              key={message.createdAt}
              display="flex"
              spacing="0"
              gap="2"
              style={{
                flexDirection:
                  user.id === message.userId ? "row-reverse" : "row",
              }}
              justify="flex-start"
              alignItems="flex-start"
              width="100%"
            >
              <Box>
                <Avatar name={message.userName} src={message.photoURL} />
              </Box>
              <Box width="50%">
                <Text fontSize="sm" textAlign="end">
                  {message.userName}
                </Text>
                <Box
                  bgColor="GrayText"
                  p="2"
                  marginTop="0"
                  fontSize={"md"}
                  rounded="lg"
                  overflowWrap="break-word"
                >
                  <Text overflowWrap="break-word">{message.message}</Text>
                </Box>
              </Box>
            </Stack>
          );
        })}
        <div ref={lastRef} />
      </Stack>
      <Stack
        as="form"
        width="100%"
        onSubmit={async (e) => {
          e.preventDefault();
          if (inputRef.current.value === "") return;
          await handleAddMessage(inputRef.current.value);
          lastRef.current.scrollIntoView({ behavior: "smooth" });
          inputRef.current.value = "";
        }}
      >
        <Flex>
          <Input
            rounded="none"
            roundedBottomLeft="sm"
            bgColor="InactiveCaptionText"
            overflow="auto"
            width="85%"
            size="lg"
            _focus={{ border: "none" }}
            ref={inputRef}
          />
          <Button
            width="15%"
            colorScheme="orange"
            type="submit"
            rounded="none"
            roundedBottomRight="sm"
            size="lg"
          >
            Send
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Chat;
