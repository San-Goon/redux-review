import { useSelector } from "react-redux";
import TodoList from "../components/TodoList";

function TodoListContainter() {
  const todos = useSelector((state) => state.todos);
  return <TodoList todos={todos} />;
}

export default TodoListContainter;
