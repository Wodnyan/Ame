import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import fire from "../../config/fire-config";
import { signInSchema } from "../../validation-schemas/auth";
import { useRouter } from "next/router";

interface SignUpCredentials {
  email: string;
  password: string;
}

export const SignUpForm = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<SignUpCredentials>({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({ email: "", password: "" });
      setIsLoading(true);
      await signInSchema.validateAsync(userInfo, {
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
        console.log(message);
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
        <Link href="/auth/login">
          <a>Already have an account?</a>
        </Link>
        <Button isLoading={isLoading} type="submit">
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};
