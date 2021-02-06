import { Todo } from "../../types/todo";

interface Props {
  todos: Todo[] | [];
}

const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {(todos as Todo[]).map(({ todo, id }) => (
        <li key={id}>{todo}</li>
      ))}
    </ul>
  );
};

export default Todos;
