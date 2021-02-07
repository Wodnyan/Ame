import fire from "../../config/fire-config";
import { Todo } from "../../types/todo";

export const fetchAllTodos = async (uid: string): Promise<Todo[] | []> => {
  const todosCollection = (await fire
    .firestore()
    .collection("todos")
    .where("userId", "==", uid)
    .get()) as any;
  let todos = [];
  todosCollection.forEach((doc: any) => {
    todos.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return todos;
};

export const postTodo = async (todo: string, uid: string) => {
  const newTodo = await fire.firestore().collection("todos").add({
    todo,
    completed: false,
    userId: uid,
  });
  console.log(newTodo);
  return newTodo;
};

export const updateTodo = async (todoId: string) => {
  const temp = fire.firestore().collection("todos").doc(todoId);
  const doc = (await temp.get()) as any;
  const updated = await temp.update({
    completed: !doc.completed,
  });
};
