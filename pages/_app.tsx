import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, ChatProvider } from "@lib";
import theme from "../theme";
import { AppProps } from "next/app";
import { Layout } from "@components/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <ChatProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChatProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
