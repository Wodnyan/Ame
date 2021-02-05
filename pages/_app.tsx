import { AppProps } from "next/app";
import { ChakraProvider, theme, CSSReset } from "@chakra-ui/react";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
