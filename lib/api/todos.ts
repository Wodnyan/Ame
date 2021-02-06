import fire from "../../config/fire-config";
import { Todo } from "../../types/todo";

export const getAllTodos = async (uid: string): Promise<Todo[] | []> => {
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
