import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import fire from "../../config/fire-config";
import { CLIENT_RENEG_LIMIT } from "tls";

interface UserInfo {
  email: string;
  password: string;
}

const SignUp = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await fire
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
      setIsLoading(false);
      console.log(user);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            id="email"
            onChange={handleChange}
            type="text"
            value={userInfo.email}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            onChange={handleChange}
            type="password"
            value={userInfo.password}
          />
          <FormHelperText>Don't tell anyone your password.</FormHelperText>
        </FormControl>
        <Button isLoading={isLoading} type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
