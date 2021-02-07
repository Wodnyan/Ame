import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  FormErrorMessage,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import fire from "../../config/fire-config";
import { authSchema } from "../../validation-schemas/auth";
import { useRouter } from "next/router";

interface SignUpCredentials {
  email: string;
  password: string;
}

const GoogleOAuthLoginButton = () => {
  const router = useRouter();
  const handleClick = () => {
    const provider = new fire.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        router.push("/todos");
      })
      .catch(console.log);
  };
  return (
    <Button isFullWidth marginY={"1rem"} onClick={handleClick}>
      Log in with Google
    </Button>
  );
};

export const SignUpForm = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<SignUpCredentials>({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({ email: "", password: "" });
      setIsLoading(true);
      await authSchema.validateAsync(userInfo, {
        abortEarly: false,
      });
      await fire
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
      setIsLoading(false);
      router.push("/todos");
    } catch (error) {
      setIsLoading(false);
      error.details?.map(({ message, context: { key } }) => {
        setErrors((prev: any) => ({
          ...prev,
          [key]: message,
        }));
      });
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      <GoogleOAuthLoginButton />
      <Text textAlign="center" fontSize="3em">
        Sign up
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.email !== ""}>
          <FormLabel>Email address</FormLabel>
          <Input
            id="email"
            onChange={handleChange}
            type="text"
            value={userInfo.email}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password !== ""}>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            onChange={handleChange}
            type="password"
            value={userInfo.password}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Flex justifyContent="space-between" alignItems="center">
          <NextLink href="/auth/login">
            <Link textDecoration="underline" color="blue.500">
              Sign in with your existing account
            </Link>
          </NextLink>
          <Button isLoading={isLoading} type="submit">
            Sign Up
          </Button>
        </Flex>
      </form>
    </>
  );
};

export const LoginForm = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<SignUpCredentials>({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({
        email: "",
        password: "",
      });
      setIsLoading(true);
      const validated = await authSchema.validateAsync(userInfo, {
        abortEarly: false,
      });
      const userCreds = await fire
        .auth()
        .signInWithEmailAndPassword(validated.email, validated.password);
      setIsLoading(false);
      router.push("/todos");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/user-not-found") {
        setErrors((prev: any) => ({
          ...prev,
          email: "User not found",
        }));
      }
      if (error.code === "auth/wrong-password") {
        setErrors((prev: any) => ({
          ...prev,
          password: "Incorrect password",
        }));
      }
      error.details?.map(({ message, context: { key } }) => {
        setErrors((prev: any) => ({
          ...prev,
          [key]: message,
        }));
      });
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      <GoogleOAuthLoginButton />
      <Text textAlign="center" fontSize="3em">
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.email !== ""}>
          <FormLabel>Email address</FormLabel>
          <Input
            id="email"
            onChange={handleChange}
            type="text"
            value={userInfo.email}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password !== ""}>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            onChange={handleChange}
            type="password"
            value={userInfo.password}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Flex justifyContent="space-between" alignItems="center">
          <NextLink href="/auth/sign-up">
            <Link textDecoration="underline" color="blue.500">
              Create an account
            </Link>
          </NextLink>
          <Button isLoading={isLoading} type="submit">
            Login
          </Button>
        </Flex>
      </form>
    </>
  );
};
