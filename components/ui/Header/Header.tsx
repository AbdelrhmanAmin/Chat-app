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
        px={{ base: "2", sm: "8" }}
        py="2"
        align="center"
        justify="space-between"
      >
        <Stack direction="row" align="center" justify="start">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            href="https://github.com/AbdelrhmanAmin"
            isExternal
          >
            <Button
              bgColor="yellow.500"
              _hover={{ bg: "yellow.400" }}
              _focus={{ bg: "yellow.400", transform: "scale(0.95)" }}
              _active={{ bg: "yellow.400", transform: "scale(0.95)" }}
              size="md"
              px="0"
            >
              <span>🐺</span>
            </Button>
          </Link>
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
            <Button
              bgColor="blue.400"
              _hover={{ bg: "blue.600" }}
              _focus={{ bg: "blue.600", transform: "scale(0.95)" }}
              _active={{ bg: "blue.600", transform: "scale(0.95)" }}
              size="md"
              px="0"
            >
              <GithubIcon size={6} />
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
