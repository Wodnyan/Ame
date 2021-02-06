import Head from "next/head";
import { LoginForm } from "../../components/Auth/AuthForm";
import { Box } from "@chakra-ui/react";

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      background="gray.300"
    >
      <Head>
        <title>Login</title>
      </Head>
      <Box maxWidth="500px" width="100%">
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
