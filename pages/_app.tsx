import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, ChatProvider } from "@lib";
import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
