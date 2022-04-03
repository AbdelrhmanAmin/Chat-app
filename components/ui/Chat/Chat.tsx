import { Avatar, Box, Input, Stack, Text } from "@chakra-ui/react";
import { useChat } from "@lib";
import React from "react";

const Chat = () => {
  const { messages, handleAddMessage } = useChat();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const lastRef = React.useRef<HTMLDivElement>(null);
  return (
    <Stack
      direction="column"
      // spacing="4"
      justify="flex-end"
      alignItems="flex-start"
      width={{ base: "100%", md: "80%", lg: "50%" }}
      height="80vh"
      border="4px"
    >
      <Stack
        height="100%"
        width="100%"
        overflowY="scroll"
        pt={{ base: 4, md: 8 }}
        px={{ base: 4, md: 8 }}
      >
        {messages.map((message) => {
          return (
            <Stack key={message.id} direction="row" spacing="2">
              <Box>
                <Avatar src={message.photoURL} />
              </Box>
              <Box bgColor="GrayText" p="2" fontSize={"md"} rounded="lg">
                <Text>{message.message}</Text>
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
          await handleAddMessage(inputRef.current.value);
          lastRef.current.scrollIntoView({ behavior: "smooth" });
          inputRef.current.value = "";
        }}
      >
        <Input
          // resize="none"
          bgColor="InactiveCaptionText"
          overflow="auto"
          ref={inputRef}
        />
      </Stack>
    </Stack>
  );
};

export default Chat;
