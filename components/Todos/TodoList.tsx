import { Todo as TodoType } from "../../types/todo";
import Todo from "./Todo";
import { UnorderedList } from "@chakra-ui/react";

interface Props {
  todos: TodoType[] | [];
  toggleCompleted: (todoId: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleCompleted }) => {
  return (
    <UnorderedList
      marginLeft={0}
      overflow="auto"
      height="md"
      listStyleType="none"
    >
      {(todos as TodoType[]).map(({ todo, id, completed }) => (
        <Todo
          toggleCompleted={toggleCompleted}
          completed={completed}
          todoId={id}
          key={id}
        >
          {todo}
        </Todo>
      ))}
    </UnorderedList>
  );
};

export default TodoList;
