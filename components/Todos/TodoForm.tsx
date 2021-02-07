import { Button, FormControl, Input } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Todo } from "../../types/todo";

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

let todoId = 0;

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [todo, setTodo] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      todo,
      id: todoId++,
      completed: false,
    });
    setTodo("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl display="flex" id="todo">
        <Input
          onChange={handleChange}
          value={todo}
          placeholder="todo"
          type="text"
        />
        <Button>Add</Button>
      </FormControl>
    </form>
  );
};
export default TodoForm;
