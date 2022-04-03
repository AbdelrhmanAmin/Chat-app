import { Button, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@lib";
import React from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  return (
    <Stack as="header">
      <Stack
        direction="row"
        spacing="4px"
        px="8"
        py="2"
        align="center"
        justify="space-between"
      >
        <Stack direction="row" align="center" justify="start">
          <Text>[Logo]</Text>
        </Stack>
        <Stack direction="row" align="center" justify="end">
          {user && <Button onClick={signOut}>Sign out</Button>}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
