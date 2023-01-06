import TodoForm from "~/components/TodoForm";
import { type Todo } from "@prisma/client";
import useStore from "~/utils/useStore";
import { Modal } from "react-daisyui";

interface TodoEditModalProps {
  currentTodo: Todo | undefined;
}

const TodoEditModal: React.FC<TodoEditModalProps> = ({ currentTodo }) => {
  const editModalIsOpen = useStore((state) => state.editModalIsOpen);
  const setEditModalIsOpen = useStore((state) => state.setEditModalIsOpen);
  return (
    <>
      <Modal
        open={editModalIsOpen}
        onClickBackdrop={() => setEditModalIsOpen(!editModalIsOpen)}
      >
        <Modal.Header className="ext-lg font-bold">Editing Todo</Modal.Header>
        <Modal.Body>
          <TodoForm todo={currentTodo} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TodoEditModal;
