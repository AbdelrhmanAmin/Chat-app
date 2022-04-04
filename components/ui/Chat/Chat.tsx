import {
  Avatar,
  Box,
  Button,
  Flex,
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
    <Stack width={{ base: "100%", md: "80%", lg: "50%" }} direction="column">
      {user && (
        <Text
          textOverflow="ellipsis"
          width={{ base: "100%", md: "80%", lg: "50%" }}
        >
          Hello, {user.name} ✌️
        </Text>
      )}
      <Stack
        direction="column"
        spacing="0"
        rounded="lg"
        justify="flex-end"
        alignItems="flex-start"
        width="100%"
        height={{ base: "85vh", sm: "75vh" }}
        border="4px"
      >
        <Stack
          height="100%"
          width="100%"
          overflowY="auto"
          py={{ base: 4 }}
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
                    user.id === message.userId ? "row" : "row-reverse",
                }}
                justify="flex-start"
                alignItems="flex-start"
                width="100%"
              >
                <Box pt="2">
                  <Avatar name={message.userName} src={message.photoURL} />
                </Box>
                <Box
                  width={{ base: "80%", sm: "75%", md: "fit-content" }}
                  display="flex"
                  flexDirection="column"
                  alignItems={
                    user.id === message.userId ? "flex-start" : "flex-end"
                  }
                >
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    px={1}
                    textAlign={user.id === message.userId ? "start" : "end"}
                  >
                    {message.userName}
                  </Text>
                  <Box
                    bgColor={
                      user.id === message.userId ? "messenger.500" : "grayText"
                    }
                    p="2"
                    margin="0"
                    fontSize={"md"}
                    rounded="lg"
                    wordBreak="break-all"
                    width="fit-content"
                    display="flex"
                  >
                    <Text>{message.message}</Text>
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
              bgColor="gray.700"
              overflow="auto"
              width="85%"
              size="lg"
              _focus={{ border: "none" }}
              ref={inputRef}
            />
            <Button
              width={{ base: "35%", sm: "15%" }}
              bgColor="messenger.500"
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
    </Stack>
  );
};

export default Chat;
