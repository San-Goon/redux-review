import TodoFormContainer from "../containers/TodoFormContainer";
import TodoListContainter from "../containers/TodoListContainer";

export default function Todos() {
  return (
    <div>
      <TodoListContainter />
      <TodoFormContainer />
    </div>
  );
}
