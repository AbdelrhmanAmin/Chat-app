import { Stack } from "@chakra-ui/react";
import React from "react";
import { Header } from "@components/ui";

const Layout = ({ children }) => {
  return (
    <Stack width="100vw" height="100vh">
      <Header />
      <Stack as="main" width="100%" height="100%">
        {children}
      </Stack>
    </Stack>
  );
};

export default Layout;
