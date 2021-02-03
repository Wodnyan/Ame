import Head from "next/head";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input
} from "@chakra-ui/react";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </>
  );
};

export default SignUp;
