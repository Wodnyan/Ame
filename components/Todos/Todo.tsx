import { Text, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface TodoProps {
  completed: boolean;
  children: React.ReactNode;
  toggleCompleted: (todoId: string) => void;
  todoId: string;
}

const Todo: React.FC<TodoProps> = ({
  children,
  completed,
  toggleCompleted,
  todoId,
}) => {
  return (
    <ListItem  paddingRight="10px" alignItems="center" display="flex">
      {completed ? (
        <ListIcon
          alignSelf="start"
          as={MdCheckBox}
          fontSize="30px"
          cursor="pointer"
          onClick={() => toggleCompleted(todoId)}
        />
      ) : (
        <ListIcon
          alignSelf="start"
          as={MdCheckBoxOutlineBlank}
          fontSize="30px"
          cursor="pointer"
          onClick={() => toggleCompleted(todoId)}
        />
      )}
      <Text
        wordBreak="break-all"
        fontSize="1.5rem"
        textDecoration={completed ? "line-through" : "none"}
      >
        {children}
      </Text>
    </ListItem>
  );
};

export default Todo;
