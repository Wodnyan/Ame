import Head from "next/head";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>雨Ame</title>
      </Head>
      <Link as={NextLink} href="/auth/sign-up">
        Sign Up
      </Link>
    </>
  );
}
