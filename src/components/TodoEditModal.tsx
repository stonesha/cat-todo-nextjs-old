import TodoForm from "~/components/TodoForm";
import { type Todo } from "@prisma/client";
import useStore from "~/utils/useStore";
import { useClickAway } from "react-use";
import { useRef } from "react";

interface TodoEditModalProps {
  currentTodo: Todo | undefined;
}

const TodoEditModal: React.FC<TodoEditModalProps> = ({ currentTodo }) => {
  const editModalIsOpen = useStore((state) => state.editModalIsOpen);
  const setEditModalIsOpen = useStore((state) => state.setEditModalIsOpen);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setEditModalIsOpen(false);
  });

  return (
    <>
      <input type="checkbox" id="todo-edit-modal" className="modal-toggle" />
      <label
        htmlFor="todo-edit-modal"
        className={`${
          editModalIsOpen ? "modal-open" : ""
        } modal-center modal cursor-pointer`}
      >
        <label className="modal-box relative" ref={ref}>
          <h3 className="text-lg font-bold">Editing Todo</h3>
          <TodoForm todo={currentTodo} />
        </label>
      </label>
    </>
  );
};

export default TodoEditModal;
