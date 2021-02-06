import Head from "next/head";
import { useEffect, useState } from "react";
import fire from "../config/fire-config";
import { useRouter } from "next/router";
import { fetchAllTodos, postTodo } from "../lib/api/todos";
import { Todo } from "../types/todo";
import TodoList from "../components/Todos/TodoList";
import { Box, Spinner } from "@chakra-ui/react";
import TodoForm from "../components/Todos/TodoForm";

const TodosPage = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [userUId, setUserUId] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check auth state
  useEffect(() => {
    fire?.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserUId(user.uid);
      } else {
        router.push("/auth/sign-up");
      }
    });
  }, []);

  // Get all todos
  useEffect(() => {
    setIsLoading(true);
    if (userUId) {
      fetchAllTodos(userUId)
        .then((todos) => {
          setTodos(todos);
          console.log(todos);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [userUId]);

  const handleSignOut = async () => {
    await fire.auth().signOut();
    router.push("/");
  };

  const addTodo = async (todo: Todo) => {
    try {
      setTodos((prev) => [...prev, todo]);
      const newTodo = await postTodo(todo.todo, userUId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="100%"
        background="blue.500"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1>hello</h1>
            <TodoList todos={todos} />
            <TodoForm addTodo={addTodo} />
          </>
        )}
      </Box>
    </>
  );
};

export default TodosPage;
