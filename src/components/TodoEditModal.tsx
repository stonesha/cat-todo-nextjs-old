import TodoForm from "~/components/TodoForm";
import { type Todo } from "@prisma/client";

interface TodoEditModalProps {
  currentTodo: Todo | undefined;
}

const TodoEditModal: React.FC<TodoEditModalProps> = ({ currentTodo }) => {
  return (
    <>
      {currentTodo ? (
        <>
          <input
            type="checkbox"
            id="todo-edit-modal"
            className="modal-toggle"
          />
          <label htmlFor="todo-edit-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold">Editing Todo</h3>
              <TodoForm todo={currentTodo} />
            </label>
          </label>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TodoEditModal;
