import { Stack } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Stack as="header"></Stack>
      <Stack as="main">{children}</Stack>
    </>
  );
};

export default Layout;
