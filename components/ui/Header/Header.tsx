import React from "react";
import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { GithubIcon } from "@components/icons";
import { useAuth } from "@lib";

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
          {user && <Text>{user.name}</Text>}
        </Stack>
        <Stack direction="row" align="center" justify="end">
          {user && (
            <Button onClick={signOut} size="md">
              Sign out
            </Button>
          )}

          <Link
            href="https://github.com/AbdelrhmanAmin/Chat-app-next-chakra"
            isExternal
          >
            <Button bgColor="Highlight" size="md" px="0">
              <GithubIcon size={6} />
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
