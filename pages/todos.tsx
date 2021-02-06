import Head from "next/head";
import { useEffect, useState } from "react";
import fire from "../config/fire-config";
import { useRouter } from "next/router";
import { getAllTodos } from "../lib/api/todos";
import { Todo } from "../types/todo";
import Todos from "../components/Todos/Todos";

const TodosPage = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [userUId, setUserUId] = useState<null | string>(null);

  // Check auth state
  useEffect(() => {
    fire?.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.uid);
        setUserUId(user.uid);
      } else {
        router.push("auth/sign-up");
      }
    });
  }, []);

  // Get all todos
  useEffect(() => {
    if (userUId) {
      getAllTodos(userUId)
        .then((todos) => setTodos(todos))
        .catch(console.error);
    }
  }, [userUId]);

  const handleSignOut = async () => {
    await fire.auth().signOut();
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>
      <Todos todos={todos} />
      <button onClick={handleSignOut}>sign out</button>
    </>
  );
};

export default TodosPage;
