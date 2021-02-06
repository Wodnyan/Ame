import Head from "next/head";
import { SignUpForm } from "../../components/Auth/AuthForm";
import { Box } from "@chakra-ui/react";

const SignUp = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      background="gray.300"
    >
      <Head>
        <title>Sign Up</title>
      </Head>
      <Box maxWidth="500px" width="100%">
        <SignUpForm />
      </Box>
    </Box>
  );
};

export default SignUp;
